export type TimelineItem = {
  title: string;
  organization: string;
  period: string;
  description?: string;
  badges?: string[];
};

/** 학력·경력 타임라인 단일 소스 — 홈(/)과 /education이 공유 */
export const timeline: TimelineItem[] = [
  {
    title: "UX개발팀 과장 / 기술연구원",
    organization: "(주) TILS AI",
    period: "2023.03 ~ 재직중",
    description:
      "Next.js, Remix.js, Typescript 기반 플랫폼 PM, 개발 리드\nCafe24, Shopby, Shopify 플랫폼 사용자화, 유지보수",
    badges: ["팀 리딩", "풀스택 개발", "플랫폼 개발"],
  },
  {
    title: "항해 플러스",
    organization: "프론트엔드 5기 / 백엔드 9기",
    period: "2025.03 ~ 2025.09",
    description: "프론트엔드: 블랙배지(1%) 달성, 회고상 수상\n백엔드: 브라운배지 달성, 회고상 수상",
    badges: ["블랙배지 1%", "회고상 2회"],
  },
  {
    title: "삼성 청년 SW아카데미 (SSAFY)",
    organization: "7기",
    period: "2022.01 ~ 2022.12",
    description:
      "삼성 주관 고용 노동부 후원 개발자 양성 과정. NAYA(최우수), README-NFT(우수), 당신의 계절(우수), SSAFIT(우수) 프로젝트 수행",
    badges: ["최우수상 1회", "우수상 3회"],
  },
  {
    title: "대한민국 육군 장교",
    organization: "대위 전역 (6년 4개월)",
    period: "2015.03 ~ 2021.06",
    description: "1포대장, 본부포대장, 인사과장, 정보과장, 사격지휘장교(작전보좌관), 관측장교 역임",
    badges: ["인헌상", "충무상", "보안 상훈 2건"],
  },
  {
    title: "충남대학교",
    organization: "천문우주과학 전공 (ROTC 53기)",
    period: "2011.03 ~ 2015.02",
    description: "총 평점 3.91 / 4.5, 전공 평점 3.98 / 4.5",
  },
];
