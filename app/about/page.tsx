"use client";

import { PageContainer } from "@/components/page-container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Heart, Target, Briefcase, Award } from "lucide-react";
import { motion } from "motion/react";

const interests = [
  "풀스택 개발",
  "UX 최적화",
  "클린 아키텍처",
  "기술 리더십",
  "스마트 제조",
  "안드로이드 개발",
];

const AboutPage = () => {
  return (
    <PageContainer>
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-foreground mb-2">About</h1>
        <p className="text-muted-foreground text-lg">언어로 세상을 표현하는 개발자</p>
      </motion.header>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-sky/10 rounded-lg">
                  <User className="w-6 h-6 text-primary-sky" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-2">안성진</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    기술을 학습하는데 있어 빠른 습득 속도를 자부합니다.
                    <br />
                    교육 과정이나 업무 실적에서 중상 이상을 달성해왔습니다.
                    <br /><br />
                    개발의 시작은 Java로 시작하였지만,
                    <br />
                    현재는 Next.js, Typescript, Prisma를 가장 잘 사용합니다.
                    <br /><br />
                    안드로이드 Kotlin(Jetpack Compose) 개발 능력이 있으며,
                    <br />
                    Vanilla JS만으로도 웹 개발이 가능합니다.
                    <br />
                    PHP 환경을 React, Remix.js 환경으로 마이그레이션한 경험이 있습니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-sky/10 rounded-lg">
                  <Briefcase className="w-6 h-6 text-primary-sky" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-2">현재</h2>
                  <p className="text-primary-sky font-medium">(주) 위피엔피</p>
                  <p className="text-muted-foreground">UX개발팀장 / 기술연구원</p>
                  <p className="text-sm text-muted-foreground mt-1">2023.03 ~ 재직중</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-sky/10 rounded-lg">
                  <Heart className="w-6 h-6 text-primary-sky" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-4">관심 분야</h2>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <Badge key={interest} variant="sky">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-sky/10 rounded-lg">
                  <Award className="w-6 h-6 text-primary-sky" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-4">자격증</h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">정보처리기사 (2023.11)</Badge>
                    <Badge variant="secondary">SQLD (2022.09)</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-sky/10 rounded-lg">
                  <Target className="w-6 h-6 text-primary-sky" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-2">목표</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    기술을 통해 사람들의 일상을 더 편리하게 만드는 것이 목표입니다.
                    복잡한 문제를 단순하게, 어려운 기술을 쉽게 전달하며
                    함께 성장하는 개발 문화를 만들어가고자 합니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default AboutPage;
