import type {
  ArticleDetail,
  HomePageData,
  MediaAsset,
  PortfolioDetail,
  ServicePage,
  ServiceSlug,
} from '@models/content';
import type { CompanyPageData } from '@models/site';
import { createSeo } from './seo';

const media = (id: string, alt: string, path = '/placeholder-thumb.svg'): MediaAsset => ({
  id,
  path,
  publicUrl: path,
  alt,
  width: 1200,
  height: 675,
  mimeType: 'image/svg+xml',
});

export const servicePages: ServicePage[] = [
  {
    slug: 'management',
    title: '경영전략 솔루션',
    subtitle: '지속가능한 성장을 위한 로드맵을 구조화합니다.',
    hero: {
      eyebrow: 'Management',
      kicker: '전략은 방향을 정하고, 실행은 성과를 만든다.',
      image: media('service-management', '경영전략 대표 이미지'),
    },
    sections: [
      {
        id: 'overview',
        eyebrow: '핵심 과제',
        title: '전략, 조직, 실행체계를 한 번에 재정렬합니다.',
        intro: '시장 불확실성 속에서 사업 방향과 실행 우선순위를 동시에 정리할 수 있도록 지원합니다.',
        features: [
          { title: '중장기 성장 시나리오', description: '시장 변화, 내부 역량, 투자 여력을 함께 고려한 성장 경로를 설계합니다.' },
          { title: '비전 및 핵심가치 정렬', description: '리더십 메시지부터 현장 실행까지 하나의 운영 언어로 묶습니다.' },
          { title: '실행 로드맵 수립', description: '분기 단위 과제와 KPI를 명확히 나눠 실행 가능한 전략으로 전환합니다.' },
        ],
      },
      {
        id: 'deliverables',
        eyebrow: '산출물',
        title: '전략 문서보다 실행 기준을 남깁니다.',
        intro: '실제 조직이 사용할 수 있는 운영 기준과 의사결정 프레임을 제공합니다.',
        features: [
          { title: '전략 맵', description: '핵심 목표, 책임 조직, 지표를 연결한 전략 맵을 제공합니다.' },
          { title: '우선순위 백로그', description: '중요도와 난이도 기준으로 실행 과제를 정리합니다.' },
          { title: '경영 워크숍 설계', description: '내부 정렬을 위한 리더십 워크숍 구조를 설계합니다.' },
        ],
      },
    ],
    seo: createSeo({
      title: '경영전략 솔루션',
      description: '시장 변화 속에서 방향성과 실행력을 동시에 확보하는 경영전략 컨설팅.',
      canonicalPath: '/service/management/',
      ogImageUrl: '/og-default.svg',
    }),
  },
  {
    slug: 'business',
    title: '영업/마케팅 솔루션',
    subtitle: '고객 접근 전략을 수익 구조와 연결합니다.',
    hero: {
      eyebrow: 'Business',
      kicker: '브랜드 메시지와 세일즈 운영을 분리하지 않습니다.',
      image: media('service-business', '영업마케팅 대표 이미지'),
    },
    sections: [
      {
        id: 'growth',
        eyebrow: '성장 전략',
        title: '세그먼트별 고객 확보 전략을 설계합니다.',
        intro: '시장 세분화, 메시지, 파이프라인 운영을 하나의 프레임으로 정리합니다.',
        features: [
          { title: '세일즈 퍼널 진단', description: '전환 병목을 진단하고 채널별 개선 우선순위를 정합니다.' },
          { title: '메시지 아키텍처', description: '고객 유형별 제안 메시지와 증빙 포인트를 정리합니다.' },
          { title: '캠페인 로드맵', description: '콘텐츠와 영업 액션이 연결된 분기 실행 계획을 설계합니다.' },
        ],
      },
      {
        id: 'operations',
        eyebrow: '운영 체계',
        title: '성과를 반복할 수 있는 프로세스를 만듭니다.',
        intro: '담당자 개인 역량이 아니라 팀 운영 체계로 성과를 재현합니다.',
        features: [
          { title: '영업 관리 기준', description: '리드 스코어링, 미팅 관리, 제안 관리 기준을 수립합니다.' },
          { title: '콘텐츠 플레이북', description: '브랜드/상품별 메시지와 소재 운영 원칙을 정의합니다.' },
          { title: '성과 리포팅', description: '경영진과 현장이 같이 보는 핵심 지표 체계를 구성합니다.' },
        ],
      },
    ],
    seo: createSeo({
      title: '영업/마케팅 솔루션',
      description: '영업 활성화와 마케팅 운영을 하나의 성장 체계로 설계합니다.',
      canonicalPath: '/service/business/',
    }),
  },
  {
    slug: 'cx',
    title: '고객경험(CX) 솔루션',
    subtitle: '접점 경험을 브랜드 경쟁력으로 전환합니다.',
    hero: {
      eyebrow: 'CX',
      kicker: '경험의 흐름을 설계해야 재구매와 추천이 만들어집니다.',
      image: media('service-cx', '고객경험 대표 이미지'),
    },
    sections: [
      {
        id: 'journey',
        eyebrow: '경험 설계',
        title: '고객여정 전체를 보고 개선 포인트를 찾습니다.',
        intro: '인지부터 재구매까지 전 과정을 분석해 이탈 구간과 감정 전환점을 구조화합니다.',
        features: [
          { title: '여정 맵 설계', description: '접점별 행동, 기대, 불편 요소를 시각화합니다.' },
          { title: 'VOC 체계화', description: '정성·정량 VOC를 운영 지표와 연결합니다.' },
          { title: '응대 표준화', description: '현장 품질 편차를 줄이는 고객응대 기준을 설계합니다.' },
        ],
      },
      {
        id: 'enablement',
        eyebrow: '내재화',
        title: '조직이 실제로 지킬 수 있는 기준을 만듭니다.',
        intro: 'CX 크레도와 운영 매뉴얼을 통해 현장 실행력을 높입니다.',
        features: [
          { title: 'CX 크레도', description: '조직이 고객 앞에서 지켜야 할 원칙을 명문화합니다.' },
          { title: '매뉴얼 정비', description: '현장 상황별 응대와 예외 처리 기준을 구체화합니다.' },
          { title: '품질 모니터링', description: '정기적인 서비스 품질 점검 체계를 만듭니다.' },
        ],
      },
    ],
    seo: createSeo({
      title: '고객경험(CX) 솔루션',
      description: '고객여정, VOC, 응대 기준을 기반으로 접점 경험을 고도화합니다.',
      canonicalPath: '/service/cx/',
    }),
  },
  {
    slug: 'group',
    title: '인사조직(HR) 솔루션',
    subtitle: '사람과 구조를 함께 설계해야 실행이 유지됩니다.',
    hero: {
      eyebrow: 'HR',
      kicker: '조직 설계는 채용보다 운영 방식의 문제에 가깝습니다.',
      image: media('service-group', '인사조직 대표 이미지'),
    },
    sections: [
      {
        id: 'design',
        eyebrow: '조직 설계',
        title: '역할과 책임을 다시 정렬합니다.',
        intro: '조직 규모와 성장 단계에 맞는 역할 정의, 협업 구조, 평가 기준을 설계합니다.',
        features: [
          { title: '직무/역할 재정의', description: '업무 중복과 누락을 줄이는 역할 구조를 정리합니다.' },
          { title: '평가 기준 수립', description: '성과와 행동 기준을 연결하는 평가 프레임을 설계합니다.' },
          { title: '리더십 체계', description: '관리자 운영 원칙과 회의 구조를 정비합니다.' },
        ],
      },
      {
        id: 'culture',
        eyebrow: '문화 내재화',
        title: '일하는 방식을 바꾸는 운영 원칙을 만듭니다.',
        intro: '핵심가치와 협업 규칙이 실제 운영 습관으로 이어지도록 설계합니다.',
        features: [
          { title: '온보딩 구조', description: '새 구성원이 빠르게 적응할 수 있는 온보딩 프로세스를 만듭니다.' },
          { title: '팀 리추얼', description: '주간 운영 리듬과 피드백 체계를 설계합니다.' },
          { title: '커뮤니케이션 원칙', description: '의사결정, 보고, 협업 규칙을 표준화합니다.' },
        ],
      },
    ],
    seo: createSeo({
      title: '인사조직(HR) 솔루션',
      description: '조직 설계와 운영 원칙을 정비해 실행 가능한 HR 체계를 만듭니다.',
      canonicalPath: '/service/group/',
    }),
  },
  {
    slug: 'research',
    title: '리서치 솔루션',
    subtitle: '시장과 고객의 신호를 실행 가능한 인사이트로 변환합니다.',
    hero: {
      eyebrow: 'Research',
      kicker: '정리된 자료가 아니라 의사결정에 필요한 근거를 만듭니다.',
      image: media('service-research', '리서치 대표 이미지'),
    },
    sections: [
      {
        id: 'market',
        eyebrow: '시장 분석',
        title: '시장 구조와 경쟁 구도를 빠르게 정리합니다.',
        intro: '산업 변화, 고객 요구, 경쟁사 움직임을 경영 판단 가능한 수준으로 재가공합니다.',
        features: [
          { title: '산업 구조 분석', description: '시장 규모, 성장 요인, 리스크를 정리합니다.' },
          { title: '경쟁사 벤치마킹', description: '포지셔닝과 운영 차별점을 비교 분석합니다.' },
          { title: '고객 인사이트 발굴', description: '정성 조사와 데이터 분석을 결합해 니즈를 추출합니다.' },
        ],
      },
      {
        id: 'delivery',
        eyebrow: '활용 방식',
        title: '결과를 전략·상품·콘텐츠 의사결정에 연결합니다.',
        intro: '리서치 결과가 보고서로 끝나지 않도록 실행 활용 시나리오까지 설계합니다.',
        features: [
          { title: '이슈 브리프', description: '핵심 변화 포인트를 경영진용 브리프로 정리합니다.' },
          { title: '기회 영역 정의', description: '신사업/콘텐츠/마케팅 기회 영역을 도출합니다.' },
          { title: '후속 액션 설계', description: '실험 과제와 검증 우선순위를 제안합니다.' },
        ],
      },
    ],
    seo: createSeo({
      title: '리서치 솔루션',
      description: '시장, 고객, 경쟁 환경을 구조화해 실행 가능한 인사이트를 제공합니다.',
      canonicalPath: '/service/research/',
    }),
  },
  {
    slug: 'system',
    title: '시스템(SaaS) 솔루션',
    subtitle: '현장 운영과 데이터 흐름을 연결하는 도구를 설계합니다.',
    hero: {
      eyebrow: 'System',
      kicker: '도구는 기능보다 운영 방식에 맞게 설계되어야 합니다.',
      image: media('service-system', '시스템 대표 이미지'),
    },
    sections: [
      {
        id: 'platform',
        eyebrow: '플랫폼 기획',
        title: '운영 문제를 해결하는 SaaS 요구사항을 정리합니다.',
        intro: '부서별 사용 흐름을 분석해 반드시 필요한 기능과 데이터 모델을 구분합니다.',
        features: [
          { title: '업무 프로세스 맵', description: '현재 운영 흐름과 데이터 입력 지점을 구조화합니다.' },
          { title: '기능 우선순위', description: 'MVP와 확장 기능을 구분해 도입 리스크를 낮춥니다.' },
          { title: '운영 대시보드', description: '핵심 지표를 즉시 확인할 수 있는 화면 구조를 설계합니다.' },
        ],
      },
      {
        id: 'adoption',
        eyebrow: '도입 지원',
        title: '시스템이 실제로 쓰이도록 운영 기준을 설계합니다.',
        intro: '도입 이후 데이터 입력과 활용이 지속될 수 있도록 운영 원칙을 제안합니다.',
        features: [
          { title: '권한/워크플로 설계', description: '조직 구조에 맞춘 승인·열람 체계를 정의합니다.' },
          { title: '데이터 표준화', description: '입력 품질을 지키기 위한 항목 기준과 규칙을 정합니다.' },
          { title: '운영 교육안', description: '현장 사용자를 위한 운영 가이드를 제공합니다.' },
        ],
      },
    ],
    seo: createSeo({
      title: '시스템(SaaS) 솔루션',
      description: '운영 프로세스에 맞는 SaaS 요구사항과 데이터 구조를 설계합니다.',
      canonicalPath: '/service/system/',
    }),
  },
  {
    slug: 'ai',
    title: 'AI 솔루션',
    subtitle: '업무 맥락에 맞는 AI 활용 구조를 정의합니다.',
    hero: {
      eyebrow: 'AI',
      kicker: '기술 도입이 아니라 문제 해결 관점에서 AI를 설계합니다.',
      image: media('service-ai', 'AI 대표 이미지'),
    },
    sections: [
      {
        id: 'usecase',
        eyebrow: '활용 기획',
        title: '업무별 AI 적용 우선순위를 구체화합니다.',
        intro: '조직이 실제로 활용할 수 있는 시나리오와 운영 책임 구조를 함께 설계합니다.',
        features: [
          { title: '업무 자동화 발굴', description: '반복 작업과 문서 흐름 중 자동화 후보를 선별합니다.' },
          { title: '지식 자산 구조화', description: '내부 문서와 운영 지식을 검색 가능한 형태로 정리합니다.' },
          { title: '리스크 관리 기준', description: '정확도, 보안, 승인 절차를 고려한 AI 운영 기준을 만듭니다.' },
        ],
      },
      {
        id: 'operating-model',
        eyebrow: '운영 모델',
        title: '도입 이후의 품질 관리 체계를 포함합니다.',
        intro: 'PoC 단계에서 끝나지 않도록 운영 모니터링과 개선 사이클을 설계합니다.',
        features: [
          { title: '성능 측정 지표', description: '응답 품질과 업무 효율을 측정할 KPI를 정의합니다.' },
          { title: 'Human-in-the-loop', description: '검토와 승인 흐름을 포함한 운영 프로세스를 설계합니다.' },
          { title: '확장 로드맵', description: '팀 단위 적용에서 전사 확장까지 단계별 계획을 제안합니다.' },
        ],
      },
    ],
    seo: createSeo({
      title: 'AI 솔루션',
      description: '업무 맥락에 맞는 AI 활용 시나리오와 운영 모델을 설계합니다.',
      canonicalPath: '/service/ai/',
    }),
  },
];

const article = (
  kind: 'portfolio' | 'insight' | 'report' | 'press',
  slug: string,
  title: string,
  summary: string,
  publishedAt: string,
  bodyHtml: string,
  tags: string[],
  relatedServiceSlugs: ServiceSlug[],
  featured = false,
): ArticleDetail => ({
  id: `${kind}-${slug}`,
  kind,
  slug,
  title,
  summary,
  publishedAt,
  bodyHtml,
  tags,
  featured,
  authorName: 'BX컨설팅 리서치팀',
  relatedServiceSlugs,
  thumbnail: media(`${kind}-${slug}`, title),
  seo: createSeo({
    title,
    description: summary,
    canonicalPath: `/${kind}/${slug}/`,
  }),
  toc: [
    { id: 'background', label: '배경' },
    { id: 'signals', label: '핵심 포인트' },
    { id: 'action-plan', label: '실행 제안' },
  ],
});

export const insightEntries: ArticleDetail[] = [
  article('insight', 'ai-service-fairness', '서비스 조직의 AI 도입, 고객은 무엇을 공정하다고 느끼는가', 'AI 접점에서 고객이 느끼는 공정성과 신뢰의 기준을 서비스 운영 관점에서 정리합니다.', '2026-03-14', `<h2 id="background">배경</h2><p>서비스 현장에서 AI가 고객 접점으로 들어오면서 공정성 지각은 운영 품질의 핵심 변수가 되고 있습니다. 고객은 빠른 응답보다도 일관된 기준과 예측 가능한 경험을 중요하게 평가합니다.</p><h2 id="signals">핵심 포인트</h2><p>고객은 사람이 제공한 서비스에 더 공감적 기대를 두고, AI가 제공한 서비스에는 더 높은 일관성과 투명성을 기대합니다. 따라서 조직은 채널별로 기대치를 다르게 설계해야 합니다.</p><h2 id="action-plan">실행 제안</h2><p>응대 가이드, 예외 처리 기준, AI 안내 문구를 하나의 운영 기준으로 정리하고, 사람이 개입해야 하는 시점을 명확히 설계해야 합니다.</p>`, ['AI', '서비스경험', '운영전략'], ['ai', 'cx'], true),
  article('insight', 'brand-teasing-and-affinity', '브랜드의 장난스러운 톤은 언제 호감으로 이어지는가', '유쾌한 커뮤니케이션이 소비자 친밀감으로 이어지는 조건을 BX 관점에서 해석합니다.', '2026-02-20', `<h2 id="background">배경</h2><p>브랜드가 친근한 농담이나 장난스러운 표현을 사용할 때, 소비자는 단순한 재미보다 관계의 거리감을 먼저 판단합니다.</p><h2 id="signals">핵심 포인트</h2><p>브랜드 페르소나와 기존 신뢰 자산이 충분할 때는 친근함이 강화되지만, 맥락이 맞지 않으면 무례함으로 해석될 수 있습니다.</p><h2 id="action-plan">실행 제안</h2><p>브랜드 톤앤매너를 고객 여정 단계별로 구분하고, 유머 사용 범위를 채널별 운영 원칙으로 명시하는 것이 필요합니다.</p>`, ['브랜드', '콘텐츠전략', '커뮤니케이션'], ['business', 'research']),
];

export const reportEntries: ArticleDetail[] = [
  article('report', 'healthcare-cx-landscape', '의료 서비스 CX 지형도 2026', '의료기관 고객경험 개선 과제를 접점, 시스템, 조직 운영 관점에서 정리한 기획조사.', '2026-03-05', `<h2 id="background">배경</h2><p>의료 서비스는 예약, 대기, 진료, 수납, 사후 안내까지 다층적인 접점으로 구성됩니다. 환자 경험은 개별 친절도보다 흐름 설계의 영향을 더 크게 받습니다.</p><h2 id="signals">핵심 포인트</h2><p>병목은 대기 정보 비가시성, 사후 커뮤니케이션 부재, 내부 시스템 분절에서 주로 발생합니다.</p><h2 id="action-plan">실행 제안</h2><p>환자 여정 기준의 운영 지표를 만들고, 예약-안내-사후관리 시스템 데이터를 하나의 경험 관점으로 통합해야 합니다.</p>`, ['헬스케어', 'CX', '리서치'], ['research', 'cx'], true),
  article('report', 'retail-loyalty-playbook', '리테일 멤버십 전환 플레이북', '리테일 브랜드의 멤버십 고도화 전략을 데이터와 운영 설계 관점에서 정리합니다.', '2026-01-30', `<h2 id="background">배경</h2><p>멤버십 프로그램은 혜택 자체보다 운영 일관성과 데이터 활용 수준에 따라 재방문 효과가 달라집니다.</p><h2 id="signals">핵심 포인트</h2><p>적립형 구조만으로는 차별화가 어려우며, 고객 상태 변화에 맞는 행동 유도 장치가 필요합니다.</p><h2 id="action-plan">실행 제안</h2><p>세그먼트별 메시지, 매장 운영 스크립트, CRM 자동화 시나리오를 함께 설계해야 실질적인 전환을 만들 수 있습니다.</p>`, ['리테일', 'CRM', '고객전략'], ['business', 'system']),
];

export const pressEntries: ArticleDetail[] = [
  article('press', 'bxcon-launches-ai-consulting-framework', 'BX컨설팅, AI 컨설팅 프레임워크 공개', 'BX컨설팅이 기업용 AI 도입 검토를 위한 실행 중심 프레임워크를 발표했습니다.', '2026-03-10', `<h2 id="background">배경</h2><p>BX컨설팅은 경영, 운영, 고객경험 관점을 통합한 AI 도입 프레임워크를 정리해 공개했습니다.</p><h2 id="signals">핵심 포인트</h2><p>이번 프레임워크는 적용 과제 선정, 운영 책임 설계, 품질 측정 기준까지 포함합니다.</p><h2 id="action-plan">실행 제안</h2><p>기업은 단일 기능 도입보다 운영 문제 정의와 검증 구조 수립을 우선해야 합니다.</p>`, ['보도자료', 'AI'], ['ai'], true),
  article('press', 'bxcon-expands-cx-research-network', 'BX컨설팅, CX 리서치 협력 네트워크 확대', '산업별 고객경험 연구 대응력을 높이기 위해 외부 전문 네트워크를 확대했습니다.', '2026-02-11', `<h2 id="background">배경</h2><p>다양한 산업군의 경험 설계 이슈에 대응하기 위해 BX컨설팅은 리서치 협력 네트워크를 확장했습니다.</p><h2 id="signals">핵심 포인트</h2><p>정량 분석, 현장 인터뷰, 운영 진단을 결합하는 멀티 레이어 접근을 강화합니다.</p><h2 id="action-plan">실행 제안</h2><p>클라이언트 과제는 산업 특화 분석과 실행 설계를 결합한 형태로 제안될 예정입니다.</p>`, ['보도자료', 'CX'], ['research', 'cx']),
];

export const portfolioEntries: PortfolioDetail[] = [
  {
    ...article('portfolio', 'enterprise-sales-os', 'B2B 세일즈 운영체계 고도화 프로젝트', '영업 파이프라인, 제안 프로세스, 성과 대시보드를 재설계한 수행사례입니다.', '2026-03-01', `<h2 id="background">프로젝트 개요</h2><p>복수 사업부를 운영하는 B2B 기업을 대상으로 영업 파이프라인과 제안 운영 기준을 정비했습니다.</p><h2 id="signals">접근 방식</h2><p>리드 관리 기준, 세일즈 미팅 구조, 제안 승인 흐름을 재설계하고 CRM 요구사항을 함께 정리했습니다.</p><h2 id="action-plan">성과</h2><p>사업부별 보고 기준을 통일하고 영업 진행 상황을 단일 대시보드로 확인할 수 있게 되었습니다.</p>`, ['포트폴리오', '영업전략', 'CRM'], ['business', 'system'], true),
    clientName: '국내 B2B 솔루션 기업',
    industry: 'B2B SaaS',
    projectPeriod: '2025.10 - 2026.01',
    outcomes: [
      { label: '리드 관리 기준', value: '전 사업부 공통 정의 수립' },
      { label: '성과 리포트', value: '주간 운영 대시보드 구축' },
      { label: '영업 프로세스', value: '제안 승인 흐름 표준화' },
    ],
    services: ['business', 'system'],
  },
  {
    ...article('portfolio', 'hospital-cx-redesign', '의료기관 환자경험 개선 체계 수립', '예약부터 사후관리까지 환자 여정과 운영 기준을 재정비한 수행사례입니다.', '2026-02-07', `<h2 id="background">프로젝트 개요</h2><p>대형 의료기관의 예약, 대기, 안내, 사후관리 흐름을 환자 경험 기준으로 재구성했습니다.</p><h2 id="signals">접근 방식</h2><p>현장 인터뷰, VOC 분석, 접점 점검을 통해 주요 이탈 포인트를 정의하고 개선 우선순위를 선정했습니다.</p><h2 id="action-plan">성과</h2><p>환자 안내 문구, 접수 동선, 사후 커뮤니케이션 기준을 통합해 운영 일관성을 높였습니다.</p>`, ['포트폴리오', '헬스케어', 'CX'], ['cx', 'research']),
    clientName: '수도권 종합병원',
    industry: 'Healthcare',
    projectPeriod: '2025.08 - 2025.12',
    outcomes: [
      { label: '여정 맵', value: '핵심 접점 18개 정의' },
      { label: '운영 표준', value: '현장 응대 시나리오 정비' },
      { label: 'VOC 체계', value: '월간 개선 리뷰 체계 도입' },
    ],
    services: ['cx', 'research'],
  },
];

export const companyPages: Record<'vmc' | 'network', CompanyPageData> = {
  vmc: {
    title: 'VMC',
    intro: 'Vision, Mission, Core Value를 사업과 조직 운영의 기준으로 연결합니다.',
    highlights: [
      { title: 'Vision', body: '고객의 지속가능한 성장을 만드는 실행 중심 파트너가 됩니다.' },
      { title: 'Mission', body: '전략과 현장 운영 사이의 간극을 줄여 성과로 이어지는 컨설팅을 제공합니다.' },
      { title: 'Core Value', body: 'Clarity, Ownership, Practicality를 기준으로 문제를 정의하고 해결합니다.' },
    ],
  },
  network: {
    title: 'Network',
    intro: '산업 전문가, 연구자, 실행 파트너와 연결된 협력 구조를 통해 프로젝트 대응력을 확장합니다.',
    highlights: [
      { title: 'Research Network', body: '산업별 리서치와 소비자 조사 전문 파트너와 협업합니다.' },
      { title: 'Industry Advisors', body: '헬스케어, 리테일, B2B, 서비스 산업 전문가와 과제별 협력 체계를 운영합니다.' },
      { title: 'Implementation Partners', body: '디자인, 개발, 시스템 구축 파트너와 연계해 실행 단계까지 지원합니다.' },
    ],
  },
};

export const contentByKind = {
  portfolio: portfolioEntries,
  insight: insightEntries,
  report: reportEntries,
  press: pressEntries,
};

export const homePageData: HomePageData = {
  featuredPortfolio: portfolioEntries.slice(0, 2),
  featuredInsights: insightEntries.slice(0, 2),
  featuredReports: reportEntries.slice(0, 1),
  featuredPress: pressEntries.slice(0, 1),
  serviceHighlights: servicePages,
};
