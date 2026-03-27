# BXCON Astro Static Site

Astro 기반 정적 사이트와 Supabase CMS 백엔드 초안입니다.

## Stack

- Astro static generation
- Supabase Auth / Database / Storage / Edge Functions
- GitHub Pages deployment

## Commands

```bash
npm install
npm run dev
npm run build
```

## Environment

`.env.example`를 기준으로 `.env`를 구성합니다.

- `PUBLIC_SITE_URL`: 배포 도메인 루트 URL
- `PUBLIC_BASE_PATH`: GitHub Pages repo path
- `PUBLIC_SUPABASE_URL`: Supabase project URL
- `PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key
- `PUBLIC_DATA_SOURCE`: `mock` 또는 `supabase`

## Routes

- `/`
- `/service/[slug]`
- `/portfolio/`
- `/portfolio/[slug]`
- `/insight/`
- `/insight/[slug]`
- `/report/`
- `/report/[slug]`
- `/press/`
- `/press/[slug]`
- `/company/vmc/`
- `/company/network/`
- `/contact/`
- `/privacy/`

`/service/`, `/company/`는 1차 범위에 포함되지 않습니다.
