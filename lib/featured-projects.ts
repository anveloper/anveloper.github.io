/**
 * 홈 Featured Projects 섹션 큐레이션 — 단일 소스.
 * 프로젝트 본문/제목/태그/아이콘은 `_projects` MDX에서 가져오고(getAllProjects),
 * 여기서는 "어떤 프로젝트를, 어떤 순서로, 어떤 단축 설명으로" 보여줄지만 관리한다.
 */
export type FeaturedProject = {
  slug: string;
  /** 홈 카드 전용 단축 설명 (MDX의 전체 description과 별개) */
  summary: string;
};

export const featuredProjects: FeaturedProject[] = [
  { slug: "yougabell", summary: "워킹맘/워킹대디를 위한 육아 정보·기록·AI 챗봇 서비스" },
  { slug: "reciflow", summary: "레시피 공유·관리 모바일 플랫폼 (Supabase 백엔드 중심)" },
  {
    slug: "ttalkkakthon",
    summary: "AI와 함께하는 해커톤 — 참가 신청·갤러리·디스코드 기반 AI 자동 심사를 지원하는 해커톤 운영 플랫폼",
  },
  { slug: "dps", summary: "판매자와 제조사를 연결하는 B2B 주문형 굿즈·인쇄 제작 플랫폼" },
  { slug: "dps-store", summary: "멀티테넌트 기반 팝업 스토어 플랫폼 — 테넌트별 독립 온라인 스토어 운영" },
  { slug: "information-security-engineer", summary: "이론 학습, 문제 풀이, 모의고사 기능을 갖춘 PWA 웹 애플리케이션" },
  { slug: "naya", summary: "멀티미디어 소개 카드와 명함을 제작·공유·관리하는 크로스 플랫폼 서비스" },
  { slug: "readme-nft", summary: "그림 퀴즈 게임으로 NFT를 생성하고 거래하는 블록체인 기반 플랫폼" },
  { slug: "your-seasons", summary: "퍼스널 컬러 자가 진단 및 전문 컨설턴트 1:1 화상 진단 서비스" },
  { slug: "ssafit", summary: "운동 영상 관리, 운동 기록 추적, 식단 관리를 통합한 피트니스 웹 애플리케이션" },
];

export type HomeProject = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  icon: string | null;
};
