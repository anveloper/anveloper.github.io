import { PageContainer } from "@/components/page-container";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TimelineItem = {
  title: string;
  organization: string;
  period: string;
  description?: string;
  badges?: string[];
};

const timeline: TimelineItem[] = [
  {
    title: "UX개발팀장 / 기술연구원",
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

const EducationPage = () => {
  return (
    <PageContainer>
      <header className="mb-10">
        <h1 className="text-xl font-semibold text-foreground tracking-tight">Education & Experience</h1>
        <p className="text-sm text-muted-foreground mt-1">학력 및 경력 사항</p>
      </header>

      <div className="space-y-0">
        {timeline.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className={cn(
              "flex flex-col sm:flex-row gap-1 sm:gap-6 py-4",
              index < timeline.length - 1 && "border-b border-border/60"
            )}
          >
            <span className="text-sm text-muted-foreground tabular-nums w-36 shrink-0">
              {item.period}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <span className="text-sm text-primary-sky">{item.organization}</span>
              </div>
              {item.description && (
                <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">{item.description}</p>
              )}
              {item.badges && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default EducationPage;
