import { PageContainer } from "@/components/page-container";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const interests = ["풀스택 개발", "UX 최적화", "클린 아키텍처", "기술 리더십", "스마트 제조", "안드로이드 개발"];

type SkillItem = { name: string };
type SkillCategory = { title: string; skills: SkillItem[] };

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [{ name: "Next.js" }, { name: "React" }, { name: "TypeScript" }, { name: "JavaScript (ES6)" }, { name: "CSS" }],
  },
  {
    title: "Backend",
    skills: [{ name: "Java" }, { name: "JPA" }, { name: "Node.js" }, { name: "Nest.js" }, { name: "Prisma" }, { name: "PHP" }],
  },
  {
    title: "Android",
    skills: [{ name: "Kotlin" }, { name: "Jetpack Compose" }],
  },
  {
    title: "DevOps & Tools",
    skills: [{ name: "AWS (EC2, S3)" }, { name: "MySQL" }, { name: "Git" }, { name: "GitHub" }, { name: "VS Code" }],
  },
];

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
    description: "삼성 주관 고용 노동부 후원 개발자 양성 과정",
    badges: ["최우수상 1회", "우수상 3회"],
  },
  {
    title: "대한민국 육군 장교",
    organization: "대위 전역 (6년 4개월)",
    period: "2015.03 ~ 2021.06",
    description: "포대장, 인사과장, 정보과장, 작전보좌관 등 역임",
    badges: ["인헌상", "충무상", "보안 상훈"],
  },
  {
    title: "충남대학교",
    organization: "천문우주과학 전공 (ROTC 53기)",
    period: "2011.03 ~ 2015.02",
    description: "총 평점 3.91 / 4.5, 전공 평점 3.98 / 4.5",
  },
];

const contactLinks = [
  { title: "Email", href: "mailto:hello@anveloper.dev", value: "hello@anveloper.dev", external: false },
  { title: "GitHub", href: "https://github.com/anveloper", value: "anveloper", external: true },
  { title: "Resume", href: "https://anveloper-dev.notion.site/ca13ffc984be4ce399d73659aebbe303", value: "Notion", external: true },
];

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-semibold text-foreground tracking-tight mb-8">{children}</h2>
);

const OverviewPage = () => {
  return (
    <PageContainer>
      {/* About */}
      <section className="mb-20">
        <SectionHeader>About</SectionHeader>
        <div className="space-y-4">
          <div className="space-y-2 text-muted-foreground leading-relaxed">
            <p>
              기술을 학습하는데 있어 빠른 습득 속도를 자부합니다.
              개발의 시작은 Java로 시작하였지만,
              현재는 Next.js, Typescript, Prisma를 가장 잘 사용합니다.
            </p>
            <p>
              안드로이드 Kotlin(Jetpack Compose) 개발과
              Vanilla JS 웹 개발, PHP에서 React/Remix.js 마이그레이션 경험이 있습니다.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="text-primary-sky font-medium">(주) TILS AI</span> UX개발팀장 2023.03 ~
            {" · "}정보처리기사{" · "}SQLD
          </p>
          <p className="text-sm text-muted-foreground">{interests.join(" / ")}</p>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-20">
        <SectionHeader>Skills</SectionHeader>
        <div className="space-y-4">
          {skillCategories.map((category) => (
            <div key={category.title} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <span className="text-sm font-medium text-foreground w-28 sm:text-right shrink-0 pt-0.5">
                {category.title}
              </span>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill.name} variant="secondary">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Experience */}
      <section className="mb-20">
        <SectionHeader>Education & Experience</SectionHeader>
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
      </section>

      {/* Contact */}
      <section>
        <SectionHeader>Contact</SectionHeader>
        <div className="space-y-3">
          {contactLinks.map((link) => (
            <div key={link.title} className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground w-16">{link.title}</span>
              <a
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
              >
                {link.value}
              </a>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
};

export default OverviewPage;
