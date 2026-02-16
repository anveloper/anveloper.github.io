import { PageContainer } from "@/components/page-container";

const interests = ["풀스택 개발", "UX 최적화", "클린 아키텍처", "기술 리더십", "스마트 제조", "안드로이드 개발"];

const AboutPage = () => {
  return (
    <PageContainer>
      <header className="mb-10">
        <h1 className="text-xl font-semibold text-foreground tracking-tight">About</h1>
        <p className="text-sm text-muted-foreground mt-1">언어로 세상을 표현하는 개발자</p>
      </header>

      <div className="space-y-0">
        {/* 자기소개 */}
        <section className="py-5 border-b border-border/60">
          <h2 className="text-sm font-medium text-foreground mb-3">소개</h2>
          <div className="space-y-2 text-muted-foreground leading-relaxed">
            <p>
              기술을 학습하는데 있어 빠른 습득 속도를 자부합니다. 교육 과정이나 업무 실적에서 중상 이상을 달성해왔습니다.
            </p>
            <p>
              개발의 시작은 Java로 시작하였지만, 현재는 Next.js, Typescript, Prisma를 가장 잘 사용합니다.
            </p>
            <p>
              판매사·공급사·어드민 다중 플랫폼 설계·개발 경험과 멀티테넌트 기반 다중 도메인 플랫폼 개발 경험이 있습니다.
              안드로이드 Kotlin(Jetpack Compose) 개발 능력이 있으며, Vanilla JS만으로도 웹 개발이 가능합니다.
              PHP 환경을 React, Remix.js 환경으로 마이그레이션한 경험이 있습니다.
            </p>
          </div>
        </section>

        {/* 현재 직장 */}
        <section className="py-5 border-b border-border/60">
          <h2 className="text-sm font-medium text-foreground mb-3">현재</h2>
          <p className="text-muted-foreground">
            <span className="text-primary-sky font-medium">(주) TILS AI</span> UX개발팀장 / 기술연구원 · 2023.03 ~ 재직중
          </p>
        </section>

        {/* 관심 분야 */}
        <section className="py-5 border-b border-border/60">
          <h2 className="text-sm font-medium text-foreground mb-3">관심 분야</h2>
          <p className="text-sm text-muted-foreground">{interests.join(" / ")}</p>
        </section>

        {/* 자격증 */}
        <section className="py-5 border-b border-border/60">
          <h2 className="text-sm font-medium text-foreground mb-3">자격증</h2>
          <p className="text-sm text-muted-foreground">정보처리기사 (2023.11) · SQLD (2022.09)</p>
        </section>

        {/* 목표 */}
        <section className="py-5">
          <h2 className="text-sm font-medium text-foreground mb-3">목표</h2>
          <p className="text-muted-foreground leading-relaxed">
            기술을 통해 사람들의 일상을 더 편리하게 만드는 것이 목표입니다.
            복잡한 문제를 단순하게, 어려운 기술을 쉽게 전달하며 함께 성장하는 개발 문화를 만들어가고자 합니다.
          </p>
        </section>
      </div>
    </PageContainer>
  );
};

export default AboutPage;
