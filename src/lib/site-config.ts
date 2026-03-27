import type { NavGroup } from '@models/site';

const trimSlashes = (value: string) => value.replace(/^\/+|\/+$/g, '');

export const siteConfig = {
  siteName: 'BX컨설팅',
  siteNameEn: 'Business eXcellence Consulting',
  siteUrl: import.meta.env.PUBLIC_SITE_URL || 'https://example.github.io',
  basePath: import.meta.env.PUBLIC_BASE_PATH || '/',
  brandAssets: {
    headerLogo:
      'https://qqhwhhtsidiozxnrajlp.supabase.co/storage/v1/object/public/site-media/shared/logo.png',
    footerLogo:
      'https://qqhwhhtsidiozxnrajlp.supabase.co/storage/v1/object/public/site-media/shared/footer-logo.png',
  },
  contactEmail: 'contact@bxcon.co.kr',
  contactPhone: '02-2152-3937',
  contactFax: '02-538-6996',
  address: '서울특별시 송파구 중대로 121, 2층(가락동, 롯데캐슬파인힐)',
};

export const normalizePath = (path: string) => {
  if (!path || path === '/') {
    return '/';
  }

  return path.endsWith('/') ? path : `${path}/`;
};

export const withBase = (path: string) => {
  const normalizedPath = normalizePath(path);
  const trimmedBase = trimSlashes(siteConfig.basePath);
  const trimmedPath = trimSlashes(normalizedPath);

  if (!trimmedBase) {
    return normalizedPath;
  }

  if (!trimmedPath) {
    return `/${trimmedBase}/`;
  }

  return `/${trimmedBase}/${trimmedPath}/`;
};

export const absoluteUrl = (path: string) => new URL(withBase(path), siteConfig.siteUrl).toString();

export const navGroups: NavGroup[] = [
  {
    label: '서비스',
    links: [
      { label: '경영전략', href: '/service/management/' },
      { label: '영업/마케팅', href: '/service/business/' },
      { label: '고객경험(CX)', href: '/service/cx/' },
      { label: '인사조직(HR)', href: '/service/group/' },
      { label: '리서치', href: '/service/research/' },
      { label: '시스템(SaaS)', href: '/service/system/' },
      { label: 'AI', href: '/service/ai/' },
    ],
  },
  {
    label: '인사이트',
    links: [
      { label: '인사이트', href: '/insight/' },
      { label: '기획조사', href: '/report/' },
      { label: '보도자료', href: '/press/' },
    ],
  },
  {
    label: '포트폴리오',
    links: [{ label: '수행사례', href: '/portfolio/' }],
  },
  {
    label: '회사소개',
    links: [
      { label: 'VMC', href: '/company/vmc/' },
      { label: 'Network', href: '/company/network/' },
    ],
  },
];
