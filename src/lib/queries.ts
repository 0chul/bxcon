import type {
  ArticleDetail,
  ContentKind,
  ContentListItem,
  HomePageData,
  MediaAsset,
  PortfolioDetail,
  ServicePage,
  ServiceSlug,
  TableOfContentsItem,
} from '@models/content';
import type {
  ContentEntryRow,
  MediaAssetRow,
  PortfolioDetailRow,
} from '@models/supabase';
import { contentByKind, homePageData } from './mock-data';
import { servicePages } from './service-pages';
import { createSeo } from './seo';
import { getSupabaseClient, shouldUseSupabase } from './supabase';

const fallbackMedia: MediaAsset = {
  id: 'fallback',
  path: '/placeholder-thumb.svg',
  publicUrl: '/placeholder-thumb.svg',
  alt: 'BX컨설팅 기본 이미지',
  width: 1200,
  height: 675,
  mimeType: 'image/svg+xml',
};

const buildToc = (bodyHtml: string): TableOfContentsItem[] =>
  [...bodyHtml.matchAll(/<h2 id="([^"]+)">([^<]+)<\/h2>/g)].map((match) => ({
    id: match[1],
    label: match[2],
  }));

const mapMedia = (row?: MediaAssetRow | null): MediaAsset => {
  if (!row) {
    return fallbackMedia;
  }

  return {
    id: row.id,
    path: row.storage_path,
    publicUrl: row.public_url,
    alt: row.alt_text || 'BX컨설팅 이미지',
    width: row.width || 1200,
    height: row.height || 675,
    mimeType: row.mime_type || 'image/*',
  };
};

const mapContentRow = (row: ContentEntryRow, heroMedia?: MediaAssetRow | null): ArticleDetail => ({
  id: row.id,
  kind: row.kind,
  slug: row.slug,
  title: row.title,
  summary: row.summary,
  thumbnail: mapMedia(heroMedia),
  publishedAt: row.published_at,
  tags: row.tags || [],
  featured: row.featured,
  bodyHtml: row.body_html,
  authorName: row.author_name || 'BX컨설팅',
  relatedServiceSlugs: (row.related_service_slugs || []) as ServiceSlug[],
  seo: createSeo({
    title: row.seo_title || row.title,
    description: row.seo_description || row.summary,
    canonicalPath: `/${row.kind}/${row.slug}/`,
    ogImageUrl: heroMedia?.public_url || '/og-default.svg',
  }),
  toc: buildToc(row.body_html),
});

const mapPortfolio = (
  row: ContentEntryRow,
  detail?: PortfolioDetailRow | null,
  heroMedia?: MediaAssetRow | null,
): PortfolioDetail => ({
  ...mapContentRow(row, heroMedia),
  clientName: detail?.client_name || 'BX컨설팅 클라이언트',
  industry: detail?.industry || 'General',
  projectPeriod:
    detail?.project_start_date && detail?.project_end_date
      ? `${detail.project_start_date} - ${detail.project_end_date}`
      : '프로젝트 기간 미정',
  outcomes: detail?.outcomes || [],
  services: (row.related_service_slugs || []) as ServiceSlug[],
});

const stripDetailFields = (item: ArticleDetail | PortfolioDetail): ContentListItem => ({
  id: item.id,
  kind: item.kind,
  slug: item.slug,
  title: item.title,
  summary: item.summary,
  thumbnail: item.thumbnail,
  publishedAt: item.publishedAt,
  tags: item.tags,
  featured: item.featured,
});

const mapKinds = (kind: ContentKind) => [...contentByKind[kind]] as (ArticleDetail | PortfolioDetail)[];

export const listServicePages = async (): Promise<ServicePage[]> => servicePages;

export const getServicePage = async (slug: ServiceSlug) =>
  servicePages.find((item) => item.slug === slug) || null;

export const listContent = async (kind: ContentKind): Promise<ContentListItem[]> => {
  if (!shouldUseSupabase()) {
    return mapKinds(kind).map(stripDetailFields);
  }

  const client = getSupabaseClient();
  if (!client) {
    return [];
  }

  const { data, error } = await client
    .from('content_entries')
    .select('id, kind, slug, title, summary, published_at, tags, featured, hero_media_id')
    .eq('kind', kind)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error || !data) {
    return [];
  }

  const mediaIds = data.map((row) => row.hero_media_id).filter(Boolean) as string[];
  const { data: mediaRows } = mediaIds.length
    ? await client.from('media_assets').select('*').in('id', mediaIds)
    : { data: [] as MediaAssetRow[] };
  const mediaMap = new Map((mediaRows || []).map((row) => [row.id, row]));

  return data.map((row) => ({
    id: row.id,
    kind: row.kind,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    thumbnail: mapMedia(mediaMap.get(row.hero_media_id || '')),
    publishedAt: row.published_at,
    tags: row.tags || [],
    featured: row.featured,
  }));
};

export const getContentDetail = async (
  kind: ContentKind,
  slug: string,
): Promise<ArticleDetail | PortfolioDetail | null> => {
  if (!shouldUseSupabase()) {
    return (mapKinds(kind).find((item) => item.slug === slug) as ArticleDetail | PortfolioDetail | undefined) || null;
  }

  const client = getSupabaseClient();
  if (!client) {
    return null;
  }

  const { data: row, error } = await client
    .from('content_entries')
    .select('*')
    .eq('kind', kind)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle<ContentEntryRow>();

  if (error || !row) {
    return null;
  }

  const { data: heroMedia } = row.hero_media_id
    ? await client.from('media_assets').select('*').eq('id', row.hero_media_id).maybeSingle<MediaAssetRow>()
    : { data: null as MediaAssetRow | null };

  if (kind === 'portfolio') {
    const { data: detail } = await client
      .from('portfolio_details')
      .select('*')
      .eq('content_id', row.id)
      .maybeSingle<PortfolioDetailRow>();

    return mapPortfolio(row, detail, heroMedia);
  }

  return mapContentRow(row, heroMedia);
};

export const listFeaturedContent = async () => {
  const groups = await Promise.all([
    listContent('portfolio'),
    listContent('insight'),
    listContent('report'),
    listContent('press'),
  ]);

  return groups.flat().filter((item) => item.featured);
};

export const getHomePageData = async (): Promise<HomePageData> => {
  if (!shouldUseSupabase()) {
    return {
      ...homePageData,
      serviceHighlights: servicePages,
    };
  }

  const [services, portfolio, insight, report, press] = await Promise.all([
    listServicePages(),
    listContent('portfolio'),
    listContent('insight'),
    listContent('report'),
    listContent('press'),
  ]);

  return {
    serviceHighlights: services,
    featuredPortfolio: (await Promise.all(
      portfolio.filter((item) => item.featured).slice(0, 2).map((item) => getContentDetail('portfolio', item.slug)),
    )).filter(Boolean) as PortfolioDetail[],
    featuredInsights: (await Promise.all(
      insight.filter((item) => item.featured).slice(0, 2).map((item) => getContentDetail('insight', item.slug)),
    )).filter(Boolean) as ArticleDetail[],
    featuredReports: (await Promise.all(
      report.filter((item) => item.featured).slice(0, 2).map((item) => getContentDetail('report', item.slug)),
    )).filter(Boolean) as ArticleDetail[],
    featuredPress: (await Promise.all(
      press.filter((item) => item.featured).slice(0, 2).map((item) => getContentDetail('press', item.slug)),
    )).filter(Boolean) as ArticleDetail[],
  };
};
