"use client";

import { PageContainer } from "@/components/page-container";
import { SkillBadge } from "@/components/skill-badge";
import { TextType } from "@/components/text-type";
import { sectionReveal, staggerContainer, staggerItem } from "@/lib/animation";
import type { HomeProject } from "@/lib/featured-projects";
import { skillCategories } from "@/lib/skill-data";
import { timeline } from "@/lib/timeline-data";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Code } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

// About Data
const aboutPhrases = [
  "빠르게 습득하고, 확실하게 쓰는 개발자 안성진입니다.",
  "교육·실무 어디서든 상급 이상을 달성해온 개발자 안성진입니다.",
  "조기 출근, 야근, 긴급 소집에 익숙한 개발자 안성진입니다.😉",
  "先入後出(선입후출), STACK처럼 가장 처음부터 끝까지 마무리하는 개발자 안성진입니다.",
  "Java에서 시작해 Next.js·TypeScript·Prisma로 전환한 개발자 안성진입니다.",
  "Vanilla JS만으로도 웹을 만들 수 있는 개발자 안성진입니다.",
  "PHP를 React, Remix.js로 마이그레이션한 개발자 안성진입니다.",
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
];

const SectionHeader = ({ children, href }: { children: React.ReactNode; href?: string }) => {
  const heading = (
    <h2 className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">{children}</h2>
  );
  if (href) {
    return (
      <Link href={href} className="group flex items-center gap-1.5 mb-4 md:mb-6 w-fit">
        {heading}
        <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-0 -translate-y-0.5 -translate-x-0.5 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
      </Link>
    );
  }
  return <div className="mb-4 md:mb-6">{heading}</div>;
};

const viewportConfig = { once: true, margin: "-80px" as const };

export const HomeView = ({ featuredProjects }: { featuredProjects: HomeProject[] }) => {
  return (
    <PageContainer>
      {/* Hero Section */}
      <motion.section variants={sectionReveal} initial="hidden" animate="visible" className="mb-10 md:mb-16">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative shrink-0">
            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden ring-2 ring-primary-sky/20">
              <Image src="/profile.webp" alt="안성진 프로필" fill className="object-cover" priority />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-primary-sky rounded-full border-2 border-background flex items-center justify-center">
              <Code className="w-2 h-2 md:w-2.5 md:h-2.5 text-white" />
            </div>
          </div>
          <div className="flex flex-col gap-0.5 md:gap-1">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">안성진</h1>
            <p className="text-xs md:text-sm font-semibold text-muted-foreground">
              Full-Stack Developer, UX Team Lead / Manager
            </p>
            <p className="text-[11px] md:text-xs text-muted-foreground/80 italic tracking-tight">
              언어로 세상을 표현하는 개발자
            </p>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-10 md:mb-16"
      >
        <p className="text-sm md:text-base leading-relaxed text-foreground min-h-[7rem] sm:min-h-[5.5rem] md:min-h-[5rem]">
          오늘의 쓸모를 다하는 사람,
          <br />
          <TextType
            text={aboutPhrases}
            typingSpeed={40}
            deletingSpeed={25}
            pauseDuration={2000}
            className="font-semibold"
            highlightText="개발자 안성진"
            highlightClassName="text-primary-sky"
            cursorClassName="text-primary-sky"
          />
        </p>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-10 md:mb-16"
      >
        <SectionHeader href="/skills">Technical Stack</SectionHeader>
        <div className="flex flex-col gap-3 md:gap-4">
          {skillCategories.map((category) => (
            <div key={category.title} className="flex items-start gap-3 md:gap-4">
              <span className="w-20 md:w-28 pt-1 text-[11px] md:text-xs font-bold text-primary-sky shrink-0 uppercase">
                {category.title}
              </span>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {category.skills.map((skill) => (
                  <SkillBadge key={skill.name} skill={skill} />
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
        className="mb-10 md:mb-16"
      >
        <SectionHeader href="/education">Milestones</SectionHeader>
        <div className="flex flex-col border-l border-border/30 ml-1 pl-4 md:pl-6 gap-4 md:gap-5">
          {timeline.map((item, index) => (
            <div key={`${item.title}-${index}`} className="relative">
              <div
                className={cn(
                  "absolute -left-5.25 md:-left-6.75 top-1 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ring-4 ring-background",
                  index === 0 ? "bg-primary-sky" : "bg-muted-foreground/30"
                )}
              />
              <p className="text-xs md:text-sm font-bold text-foreground leading-snug">
                {item.title} · {item.organization}
              </p>
              <p
                className={cn(
                  "text-[11px] md:text-xs mt-1",
                  index === 0 ? "text-primary-sky" : "text-muted-foreground"
                )}
              >
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
        className="mb-10 md:mb-16"
      >
        <SectionHeader href="/projects">Featured Projects</SectionHeader>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3"
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              variants={staggerItem}
              className={index === featuredProjects.length - 1 && featuredProjects.length % 2 !== 0 ? "col-span-2" : ""}
            >
              <Link
                href={`/projects/${project.slug}`}
                className={cn(
                  "block group p-3 md:p-4 bg-secondary/50 rounded-lg hover:bg-accent transition-colors",
                  "flex flex-col gap-2",
                  index === featuredProjects.length - 1 && featuredProjects.length % 2 !== 0 && "flex-row items-center gap-4"
                )}
              >
                {project.icon && (
                  <img src={project.icon} alt="" className="w-8 h-8 md:w-9 md:h-9 rounded-md shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-bold text-foreground group-hover:text-primary-sky transition-colors truncate">
                    {project.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-snug mt-0.5 line-clamp-1">
                    {project.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] md:text-xs px-1.5 py-0.5 bg-background text-muted-foreground rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
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
              <span className="text-[11px] md:text-sm font-medium text-foreground">{link.value}</span>
              <ArrowUpRight className="w-3 h-3 text-muted-foreground/40 ml-auto" />
            </a>
          ))}
        </div>
      </motion.section>
    </PageContainer>
  );
};
