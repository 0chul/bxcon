import type { SeoMeta } from '@models/content';
import { absoluteUrl, siteConfig } from './site-config';

export const defaultSeoImage = '/og-default.svg';

export const createSeo = (input: Partial<SeoMeta> & Pick<SeoMeta, 'title' | 'description' | 'canonicalPath'>): SeoMeta => ({
  title: input.title,
  description: input.description,
  canonicalPath: input.canonicalPath,
  ogImageUrl: input.ogImageUrl || defaultSeoImage,
  robots: input.robots || 'index,follow',
});

export const pageTitle = (title: string) => `${title} | ${siteConfig.siteName}`;

export const resolveOgImage = (imagePath?: string) => absoluteUrl(imagePath || defaultSeoImage);
