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
    title: "UX개발팀 과장 / 기술연구원",
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
    organization: "천문우주과학 전공",
    period: "2011.03 ~ 2015.02",
    description: "ROTC 53기",
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
  // TODO: 수정중
  // {
  //   title: "Resume",
  //   href: "https://anveloper-dev.notion.site/ca13ffc984be4ce399d73659aebbe303",
  //   value: "Notion",
  // },
];

const SectionHeader = ({ children, href }: { children: React.ReactNode; href?: string }) => {
  const heading = (
    <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">{children}</h2>
  );
  if (href) {
    return (
      <Link href={href} className="group flex items-center gap-1.5 mb-4 w-fit">
        {heading}
        <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-0 -translate-y-0.5 -translate-x-0.5 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
      </Link>
    );
  }
  return <div className="mb-4">{heading}</div>;
};

const viewportConfig = { once: true, margin: "-80px" as const };

const HomePage = () => {
  return (
    <PageContainer>
      {/* Hero Section */}
      <motion.section variants={sectionReveal} initial="hidden" animate="visible" className="mb-10">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary-sky/20">
              <Image src="/profile.webp" alt="안성진 프로필" fill className="object-cover" priority />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary-sky rounded-full border-2 border-background flex items-center justify-center">
              <Code className="w-2 h-2 text-white" />
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-foreground tracking-tight">안성진</h1>
            </div>
            <p className="text-xs font-semibold text-muted-foreground">Full-Stack Developer, UX Team Lead</p>
            <p className="text-[11px] text-muted-foreground/80 italic tracking-tight">언어로 세상을 표현하는 개발자</p>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-10"
      >
        <p className="text-sm leading-relaxed text-foreground">
          Next.js, TypeScript, Prisma를 주력으로 다루며{" "}
          <span className="font-semibold text-primary-sky">(주) TILS AI</span>에서 UX Team Lead로서 사용자 중심의
          인터페이스를 설계하고 개발합니다. 효율적인 코드와 뛰어난 사용자 경험의 교차점을 탐구합니다.
        </p>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-10"
      >
        <SectionHeader href="/skills">Technical Stack</SectionHeader>
        <div className="flex flex-col gap-3">
          {skillCategories.map((category) => (
            <div key={category.title} className="flex items-center gap-3">
              <span className="w-20 text-[10px] font-bold text-primary-sky shrink-0 uppercase">
                {category.title}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-2 py-0.5 bg-secondary text-[10px] font-medium text-muted-foreground rounded"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Experience & Education Section — Compact Timeline */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-10"
      >
        <SectionHeader href="/education">Milestones</SectionHeader>
        <div className="flex flex-col border-l border-border/30 ml-1 pl-4 gap-4">
          {timeline.map((item, index) => (
            <div key={`${item.title}-${index}`} className="relative">
              <div
                className={cn(
                  "absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-background",
                  index === 0 ? "bg-primary-sky" : "bg-muted-foreground/30"
                )}
              />
              <p className="text-[11px] font-bold text-foreground leading-none">
                {item.title} · {item.organization}
              </p>
              <p className={cn("text-[10px] mt-1", index === 0 ? "text-primary-sky" : "text-muted-foreground")}>
                {item.period}
              </p>
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
        className="mb-10"
      >
        <SectionHeader href="/projects">Featured Projects</SectionHeader>
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
                    <div className="flex items-center gap-3 mb-2">
                      {project.icon && <img src={project.icon} alt="" className="w-8 h-8 rounded-lg" />}
                      <div>
                        <h3 className="font-semibold group-hover:text-primary-sky transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex gap-1 mt-0.5">
                          {project.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-bold text-primary-sky/70 uppercase tracking-wider"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tags.slice(2).map((tag) => (
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
      <motion.section variants={sectionReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}>
        <SectionHeader>Connect</SectionHeader>
        <div className="flex flex-col gap-2">
          {contactLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              {...(link.title !== "Email" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-accent transition-colors"
            >
              <span className="text-[11px] font-medium text-foreground">{link.value}</span>
              <ArrowUpRight className="w-3 h-3 text-muted-foreground/40 ml-auto" />
            </a>
          ))}
        </div>
      </motion.section>
    </PageContainer>
  );
};

export default HomePage;
