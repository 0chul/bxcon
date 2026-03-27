export type ContentKind = 'portfolio' | 'insight' | 'report' | 'press';

export type ServiceSlug =
  | 'management'
  | 'business'
  | 'cx'
  | 'group'
  | 'research'
  | 'system'
  | 'ai';

export type PublishStatus = 'draft' | 'published' | 'archived';

export interface SeoMeta {
  title: string;
  description: string;
  canonicalPath: string;
  ogImageUrl?: string;
  robots?: string;
}

export interface MediaAsset {
  id: string;
  path: string;
  publicUrl: string;
  alt: string;
  width?: number;
  height?: number;
  mimeType?: string;
}

export interface TableOfContentsItem {
  id: string;
  label: string;
}

export interface ContentListItem {
  id: string;
  kind: ContentKind;
  slug: string;
  title: string;
  summary: string;
  thumbnail: MediaAsset;
  publishedAt: string;
  tags: string[];
  featured: boolean;
}

export interface ArticleDetail extends ContentListItem {
  bodyHtml: string;
  seo: SeoMeta;
  authorName: string;
  relatedServiceSlugs: ServiceSlug[];
  toc: TableOfContentsItem[];
}

export interface PortfolioOutcome {
  label: string;
  value: string;
}

export interface PortfolioDetail extends ArticleDetail {
  clientName: string;
  industry: string;
  projectPeriod: string;
  outcomes: PortfolioOutcome[];
  services: ServiceSlug[];
}

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceSection {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  features: ServiceFeature[];
}

export interface ServicePage {
  slug: ServiceSlug;
  title: string;
  subtitle: string;
  hero: {
    eyebrow: string;
    kicker: string;
    image: MediaAsset;
  };
  sections: ServiceSection[];
  seo: SeoMeta;
}

export interface HomePageData {
  featuredPortfolio: PortfolioDetail[];
  featuredInsights: ArticleDetail[];
  featuredReports: ArticleDetail[];
  featuredPress: ArticleDetail[];
  serviceHighlights: ServicePage[];
}
