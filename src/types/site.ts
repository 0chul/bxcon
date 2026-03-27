import type { ServiceSlug } from './content';

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  links: NavLink[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface CompanyPageData {
  title: string;
  intro: string;
  highlights: {
    title: string;
    body: string;
  }[];
}

export interface ContactPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consentPrivacy: boolean;
}

export interface NewsletterPayload {
  email: string;
  name?: string;
}

export interface ServiceIntroCard {
  slug: ServiceSlug;
  title: string;
  description: string;
}
