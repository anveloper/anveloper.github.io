"use client";

import { PageContainer } from "@/components/page-container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Briefcase, GraduationCap, Shield } from "lucide-react";
import { motion } from "motion/react";

type TimelineItem = {
  type: "education" | "experience" | "military" | "certificate";
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
      "Next.js, Remix.js, Typescript 기반 플랫폼 PM, 개발 리드\nCafe24, Shopby, Shopify 플랫폼 사용자화, 유지보수",
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
    description:
      "삼성 주관 고용 노동부 후원 개발자 양성 과정. NAYA(최우수), README-NFT(우수), 당신의 계절(우수), SSAFIT(우수) 프로젝트 수행",
    badges: ["최우수상 1회", "우수상 3회"],
  },
  {
    type: "military",
    title: "대한민국 육군 장교",
    organization: "대위 전역 (6년 4개월)",
    period: "2015.03 ~ 2021.06",
    description: "1포대장, 본부포대장, 인사과장, 정보과장, 사격지휘장교(작전보좌관), 관측장교 역임",
    badges: ["인헌상", "충무상", "보안 상훈 2건"],
  },
  {
    type: "education",
    title: "충남대학교",
    organization: "천문우주과학 전공 (ROTC 53기)",
    period: "2011.03 ~ 2015.02",
    description: "총 평점 3.91 / 4.5, 전공 평점 3.98 / 4.5",
  },
];

const getIcon = (type: TimelineItem["type"]) => {
  switch (type) {
    case "education":
      return <GraduationCap className="w-5 h-5 text-primary-sky" />;
    case "experience":
      return <Briefcase className="w-5 h-5 text-primary-sky" />;
    case "military":
      return <Shield className="w-5 h-5 text-primary-sky" />;
    case "certificate":
      return <Award className="w-5 h-5 text-primary-sky" />;
  }
};

const EducationPage = () => {
  return (
    <PageContainer>
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-foreground mb-2">Education & Experience</h1>
        <p className="text-muted-foreground text-lg">학력 및 경력 사항</p>
      </motion.header>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-6">
          {timeline.map((item, index) => (
            <motion.div
              key={`${item.title}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="relative pl-16"
            >
              <div className="absolute left-3 -translate-x-1/2 p-2 bg-background border border-border rounded-full">
                {getIcon(item.type)}
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <span className="text-sm text-muted-foreground">{item.period}</span>
                  </div>
                  <p className="text-primary-sky font-medium mb-2">{item.organization}</p>
                  {item.description && (
                    <p className="text-muted-foreground mb-3 whitespace-pre-line">{item.description}</p>
                  )}
                  {item.badges && (
                    <div className="flex flex-wrap gap-2">
                      {item.badges.map((badge) => (
                        <Badge key={badge} variant="sky">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default EducationPage;
