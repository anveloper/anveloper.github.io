"use client";

import { PageContainer } from "@/components/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User, Heart, Target, Briefcase, Award,
  Code, Server, Database, Wrench, Flame,
  GraduationCap, Shield,
  Mail, Github, FileText, ExternalLink,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

// About Data
const interests = ["풀스택 개발", "UX 최적화", "클린 아키텍처", "기술 리더십", "스마트 제조", "안드로이드 개발"];

// Skills Data
type Skill = { name: string; level: 1 | 2 | 3 };
type SkillCategory = { title: string; icon: React.ReactNode; skills: Skill[] };

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: <Code className="w-5 h-5" />,
    skills: [
      { name: "Next.js", level: 3 }, { name: "React", level: 2 }, { name: "TypeScript", level: 2 },
      { name: "JavaScript (ES6)", level: 3 }, { name: "CSS", level: 2 },
    ],
  },
  {
    title: "Backend",
    icon: <Server className="w-5 h-5" />,
    skills: [
      { name: "Java", level: 2 }, { name: "JPA", level: 1 }, { name: "Node.js", level: 1 },
      { name: "Nest.js", level: 1 }, { name: "Prisma", level: 1 }, { name: "PHP", level: 1 },
    ],
  },
  {
    title: "Android",
    icon: <Database className="w-5 h-5" />,
    skills: [
      { name: "Kotlin", level: 1 }, { name: "Jetpack Compose", level: 1 },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: <Wrench className="w-5 h-5" />,
    skills: [
      { name: "AWS (EC2, S3)", level: 1 }, { name: "MySQL", level: 1 },
      { name: "Git", level: 2 }, { name: "GitHub", level: 2 }, { name: "VS Code", level: 2 },
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
    organization: "(주) 위피엔피",
    period: "2023.03 ~ 재직중",
    description: "Next.js, Remix.js, Typescript 기반 플랫폼 PM, 개발 리드\nCafe24, Shopby, Shopify 플랫폼 사용자화, 유지보수",
    badges: ["팀 리딩", "풀스택 개발", "플랫폼 개발"],
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

// Contact Data
const contactLinks = [
  { title: "Email", href: "mailto:hello@anveloper.dev", icon: <Mail className="w-5 h-5" />, value: "hello@anveloper.dev" },
  { title: "GitHub", href: "https://github.com/anveloper", icon: <Github className="w-5 h-5" />, value: "anveloper" },
  { title: "Resume", href: "https://anveloper-dev.notion.site/ca13ffc984be4ce399d73659aebbe303", icon: <FileText className="w-5 h-5" />, value: "Notion" },
];

const SkillBadge = ({ skill }: { skill: Skill }) => (
  <Badge variant="secondary" className="flex items-center gap-1">
    {skill.name}
    <span className="flex ml-1">
      {Array.from({ length: skill.level }).map((_, i) => (
        <Flame key={i} className="w-3 h-3 text-orange-500 fill-orange-500" />
      ))}
    </span>
  </Badge>
);

const getTimelineIcon = (type: TimelineItem["type"]) => {
  switch (type) {
    case "education": return <GraduationCap className="w-4 h-4 text-primary-sky" />;
    case "experience": return <Briefcase className="w-4 h-4 text-primary-sky" />;
    case "military": return <Shield className="w-4 h-4 text-primary-sky" />;
  }
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
    <div className="h-1 w-8 bg-primary-sky rounded-full" />
    {children}
  </h2>
);

const OverviewPage = () => {
  return (
    <PageContainer withPattern={false}>
      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <SectionTitle>About</SectionTitle>
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-sky/10 rounded-lg">
                  <User className="w-6 h-6 text-primary-sky" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">안성진 | 언어로 세상을 표현하는 개발자</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    기술을 학습하는데 있어 빠른 습득 속도를 자부합니다.
                    <br />
                    개발의 시작은 Java로 시작하였지만,
                    <br />
                    현재는 Next.js, Typescript, Prisma를 가장 잘 사용합니다.
                    <br /><br />
                    안드로이드 Kotlin(Jetpack Compose) 개발과
                    <br />
                    Vanilla JS 웹 개발, PHP에서 React/Remix.js 마이그레이션 경험이 있습니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary-sky/10 rounded-lg">
                    <Briefcase className="w-5 h-5 text-primary-sky" />
                  </div>
                  <div>
                    <p className="text-primary-sky font-medium">(주) 위피엔피</p>
                    <p className="text-sm text-muted-foreground">UX개발팀장 · 2023.03 ~</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary-sky/10 rounded-lg">
                    <Award className="w-5 h-5 text-primary-sky" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">정보처리기사 (2023.11)</Badge>
                    <Badge variant="secondary">SQLD (2022.09)</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary-sky/10 rounded-lg">
                  <Heart className="w-5 h-5 text-primary-sky" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <Badge key={interest} variant="sky">{interest}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-16"
      >
        <SectionTitle>Skills</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          {skillCategories.map((category) => (
            <Card key={category.title}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-base">
                  <div className="p-1.5 bg-primary-sky/10 rounded-lg text-primary-sky">
                    {category.icon}
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <SkillBadge key={skill.name} skill={skill} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Education & Experience Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-16"
      >
        <SectionTitle>Education & Experience</SectionTitle>
        <div className="space-y-3">
          {timeline.map((item, index) => (
            <Card key={`${item.title}-${index}`}>
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary-sky/10 rounded-lg mt-0.5">
                    {getTimelineIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <span className="text-sm text-muted-foreground">{item.period}</span>
                    </div>
                    <p className="text-sm text-primary-sky">{item.organization}</p>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">{item.description}</p>
                    )}
                    {item.badges && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.badges.map((badge) => (
                          <Badge key={badge} variant="sky" className="text-xs">{badge}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <SectionTitle>Contact</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-3">
          {contactLinks.map((link) => (
            <Card key={link.title} className="hover:border-primary-sky/50 transition-colors">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="p-3 bg-primary-sky/10 rounded-full text-primary-sky mb-3">
                  {link.icon}
                </div>
                <h3 className="font-semibold mb-1">{link.title}</h3>
                <p className="text-sm text-primary-sky mb-3">{link.value}</p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    방문 <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>
    </PageContainer>
  );
};

export default OverviewPage;
