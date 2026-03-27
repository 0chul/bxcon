import type { ContentKind, PublishStatus } from './content';

export interface ContentEntryRow {
  id: string;
  kind: ContentKind;
  slug: string;
  title: string;
  summary: string;
  body_html: string;
  status: PublishStatus;
  hero_media_id: string | null;
  og_media_id: string | null;
  seo_title: string | null;
  seo_description: string | null;
  author_name: string | null;
  published_at: string;
  created_at: string;
  updated_at: string;
  featured: boolean;
  tags: string[] | null;
  related_service_slugs: string[] | null;
}

export interface MediaAssetRow {
  id: string;
  storage_bucket: string;
  storage_path: string;
  public_url: string;
  alt_text: string | null;
  caption: string | null;
  mime_type: string | null;
  width: number | null;
  height: number | null;
  visibility: string;
  created_by: string | null;
  created_at: string;
}

export interface PortfolioDetailRow {
  content_id: string;
  client_name: string | null;
  industry: string | null;
  project_start_date: string | null;
  project_end_date: string | null;
  outcomes: { label: string; value: string }[] | null;
}

export interface InsightDetailRow {
  content_id: string;
  reading_time_minutes: number | null;
  source_citation: string | null;
}

export interface ReportDetailRow {
  content_id: string;
  report_type: string | null;
  download_url: string | null;
}

export interface PressDetailRow {
  content_id: string;
  source_name: string | null;
  source_url: string | null;
  source_published_at: string | null;
}
