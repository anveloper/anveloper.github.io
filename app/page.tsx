"use client";

import { PageContainer } from "@/components/page-container";
import { SkillBadge, TechBadge } from "@/components/skill-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { sectionReveal, staggerContainer, staggerItem } from "@/lib/animation";
import type { SkillCategory } from "@/lib/skill-data";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Code, Database, Server, Wrench } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

// About Data
const interests = ["풀스택 개발", "UX 최적화", "클린 아키텍처", "기술 리더십", "스마트 제조", "안드로이드 개발"];

// Skills Data
const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: <Code className="w-5 h-5" />,
    skills: [
      { name: "Next.js", level: 3 },
      { name: "React", level: 3 },
      { name: "TypeScript", level: 3 },
      { name: "JavaScript (ES6)", level: 3 },
      { name: "Tailwind CSS", level: 2 },
    ],
  },
  {
    title: "Backend",
    icon: <Server className="w-5 h-5" />,
    skills: [
      { name: "Prisma", level: 3 },
      { name: "Java", level: 2 },
      { name: "Spring Boot", level: 2 },
      { name: "JPA", level: 2 },
      { name: "Node.js", level: 1 },
      { name: "Redis", level: 1 },
      { name: "Kafka", level: 1 },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: <Wrench className="w-5 h-5" />,
    skills: [
      { name: "AWS (EC2, S3)", level: 2 },
      { name: "Caddy", level: 2 },
      { name: "MySQL", level: 2 },
      { name: "Git", level: 2 },
      { name: "IntelliJ IDEA", level: 2 },
      { name: "VS Code", level: 2 },
      { name: "Naver Cloud", level: 1 },
    ],
  },
  {
    title: "Android",
    icon: <Database className="w-5 h-5" />,
    skills: [
      { name: "Kotlin", level: 1 },
      { name: "Jetpack Compose", level: 1 },
    ],
  },
];

// Education Data
type TimelineItem = {
  type: "education" | "experience" | "military";
  title: string;
  organization: string;
  period: string;
  description?: string;
  badges?: string[];
};

const timeline: TimelineItem[] = [
  {
    type: "experience",
    title: "UX개발팀장 / 기술연구원",
    organization: "(주) TILS AI",
    period: "2023.03 ~ 재직중",
    description:
      "Next.js, Remix.js, Typescript 기반 플랫폼 PM, 개발 리드\n판매사·공급사·어드민 다중 플랫폼 설계·개발\n멀티테넌트 기반 다중 도메인 플랫폼 개발\nCafe24, Shopby, Shopify 플랫폼 사용자화, 유지보수",
    badges: ["팀 리딩", "풀스택 개발", "다중 플랫폼", "멀티테넌트"],
  },
  {
    type: "education",
    title: "항해 플러스",
    organization: "프론트엔드 5기 / 백엔드 9기",
    period: "2025.03 ~ 2025.09",
    description: "프론트엔드: 블랙배지(1%) 달성, 회고상 수상\n백엔드: 브라운배지 달성, 회고상 수상",
    badges: ["블랙배지 1%", "회고상 2회"],
  },
  {
    type: "education",
    title: "삼성 청년 SW아카데미 (SSAFY)",
    organization: "7기",
    period: "2022.01 ~ 2022.12",
    description: "삼성 주관 고용 노동부 후원 개발자 양성 과정",
    badges: ["최우수상 1회", "우수상 3회"],
  },
  {
    type: "military",
    title: "대한민국 육군 장교",
    organization: "대위 전역 (6년 4개월)",
    period: "2015.03 ~ 2021.06",
    description: "포대장, 인사과장, 정보과장, 작전보좌관 등 역임",
    badges: ["인헌상", "충무상", "보안 상훈"],
  },
  {
    type: "education",
    title: "충남대학교",
    organization: "천문우주과학 전공 (ROTC 53기)",
    period: "2011.03 ~ 2015.02",
    description: "총 평점 3.91 / 4.5, 전공 평점 3.98 / 4.5",
  },
];

// Projects Data
const projects = [
  {
    title: "DPS (Design Plug Shop)",
    description: "판매자와 제조사를 연결하는 B2B 주문형 굿즈·인쇄 제작 플랫폼",
    tags: ["Next.js", "TypeScript", "Prisma", "NextAuth"],
    slug: "dps",
    icon: "/images/projects/dps/icon.webp",
  },
  {
    title: "DPS Store (디플샵 스토어)",
    description: "멀티테넌트 기반 팝업 스토어 플랫폼 — 테넌트별 독립 온라인 스토어 운영",
    tags: ["Next.js", "TypeScript", "Prisma", "Caddy"],
    slug: "dps-store",
    icon: "/images/projects/dps-store/icon.svg",
  },
  {
    title: "정보보안기사 시험 대비 웹 앱",
    description: "이론 학습, 문제 풀이, 모의고사 기능을 갖춘 PWA 웹 애플리케이션",
    tags: ["React", "TypeScript", "Vite", "PWA"],
    slug: "information-security-engineer",
    icon: "/images/projects/information-security-engineer/icon.svg",
  },
  {
    title: "NAYA",
    description: "멀티미디어 소개 카드와 명함을 제작·공유·관리하는 크로스 플랫폼 서비스",
    tags: ["Kotlin", "Jetpack Compose", "CameraX", "Room", "React", "Spring Boot"],
    slug: "naya",
    icon: "/images/projects/naya/icon.svg",
  },
  {
    title: "README",
    description: "그림 퀴즈 게임으로 NFT를 생성하고 거래하는 블록체인 기반 플랫폼",
    tags: ["React", "TypeScript", "Redux", "Socket.io", "Web3.js", "Solidity"],
    slug: "readme-nft",
    icon: "/images/projects/readme-nft/icon.svg",
  },
  {
    title: "당신의 계절",
    description: "퍼스널 컬러 자가 진단 및 전문 컨설턴트 1:1 화상 진단 서비스",
    tags: ["React", "Redux", "OpenVidu", "Spring Boot", "Redis"],
    slug: "your-seasons",
    icon: "/images/projects/your-seasons/icon.webp",
  },
  {
    title: "SSAFIT",
    description: "운동 영상 관리, 운동 기록 추적, 식단 관리를 통합한 피트니스 웹 애플리케이션",
    tags: ["Vue.js", "Vuex", "Chart.js", "Spring Boot", "MyBatis", "MySQL"],
    slug: "ssafit",
    icon: "/images/projects/ssafit/icon.svg",
  },
];

// Contact Data
const contactLinks = [
  {
    title: "Email",
    href: "mailto:hello@anveloper.dev",
    value: "hello@anveloper.dev",
  },
  {
    title: "GitHub",
    href: "https://github.com/anveloper",
    value: "anveloper",
  },
  {
    title: "Resume",
    href: "https://anveloper-dev.notion.site/ca13ffc984be4ce399d73659aebbe303",
    value: "Notion",
  },
];

const SectionHeader = ({ children, href }: { children: React.ReactNode; href?: string }) => {
  const heading = <h2 className="text-lg font-semibold text-foreground tracking-tight">{children}</h2>;
  if (href) {
    return (
      <Link href={href} className="group flex items-center gap-1.5 mb-8 w-fit">
        {heading}
        <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-y-0.5 translate-x-[-2px] transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
      </Link>
    );
  }
  return <div className="mb-8">{heading}</div>;
};

const viewportConfig = { once: true, margin: "-80px" as const };

const HomePage = () => {
  return (
    <PageContainer>
      {/* Hero Section */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        animate="visible"
        className="mb-20"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-border shrink-0">
            <Image src="/profile.webp" alt="안성진 프로필" fill className="object-cover" priority />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">안성진</h1>
            <p className="text-sm text-muted-foreground">Full-Stack Developer, UX Team Lead</p>
          </div>
        </div>
        <div className="space-y-2 text-muted-foreground leading-relaxed">
          <p>언어로 세상을 표현하는 개발자입니다.</p>
          <p>Next.js, TypeScript, Prisma를 중심으로 사용자 경험에 집중하는 풀스택 개발을 합니다.</p>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-20"
      >
        <SectionHeader href="/about">About</SectionHeader>
        <div className="space-y-4">
          <div className="space-y-2 text-muted-foreground leading-relaxed">
            <p>
              기술을 학습하는데 있어 빠른 습득 속도를 자부합니다.
              개발의 시작은 Java로 시작하였지만,
              현재는 Next.js, Typescript, Prisma를 가장 잘 사용합니다.
            </p>
            <p>
              판매사·공급사·어드민 다중 플랫폼 설계·개발 경험과
              멀티테넌트 기반 다중 도메인 플랫폼 개발 경험이 있습니다.
              안드로이드 Kotlin(Jetpack Compose) 개발과
              Vanilla JS 웹 개발, PHP에서 React/Remix.js 마이그레이션 경험이 있습니다.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="text-primary-sky font-medium">(주) TILS AI</span> UX개발팀장 2023.03 ~
            {" · "}정보처리기사{" · "}SQLD
          </p>
          <p className="text-sm text-muted-foreground">
            {interests.join(" / ")}
          </p>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-20"
      >
        <SectionHeader href="/skills">Skills</SectionHeader>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="space-y-4"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-2 sm:gap-4"
            >
              <span className="text-sm font-medium text-foreground w-28 sm:text-right shrink-0 pt-0.5">
                {category.title}
              </span>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <SkillBadge key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Experience & Education Section */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-20"
      >
        <SectionHeader href="/education">Experience & Education</SectionHeader>
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
      </motion.section>

      {/* Projects Section */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-20"
      >
        <SectionHeader href="/projects">Projects</SectionHeader>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid gap-3 sm:grid-cols-2"
        >
          {projects.map((project) => (
            <motion.div key={project.slug} variants={staggerItem}>
              <Link href={`/projects/${project.slug}`} className="block group">
                <Card className="hover:border-foreground/20 transition-colors h-full">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      {project.icon && <img src={project.icon} alt="" className="w-6 h-6 rounded" />}
                      <h3 className="font-semibold group-hover:text-primary-sky transition-colors">{project.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <TechBadge key={tag} name={tag} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <SectionHeader>Contact</SectionHeader>
        <div className="space-y-3">
          {contactLinks.map((link) => (
            <div key={link.title} className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground w-16">{link.title}</span>
              <a
                href={link.href}
                {...(link.title !== "Email" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
              >
                {link.value}
              </a>
            </div>
          ))}
        </div>
      </motion.section>
    </PageContainer>
  );
};

export default HomePage;
