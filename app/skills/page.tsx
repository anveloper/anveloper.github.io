"use client";

import { PageContainer } from "@/components/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Server, Database, Wrench, Flame } from "lucide-react";
import { motion } from "motion/react";

type Skill = {
  name: string;
  level: 1 | 2 | 3;
};

type SkillCategory = {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    title: "Front-End",
    icon: <Code className="w-5 h-5" />,
    skills: [
      { name: "Next.js", level: 3 },
      { name: "React", level: 2 },
      { name: "TypeScript", level: 2 },
      { name: "JavaScript (ES6)", level: 3 },
      { name: "CSS", level: 2 },
    ],
  },
  {
    title: "Back-End",
    icon: <Server className="w-5 h-5" />,
    skills: [
      { name: "Java", level: 2 },
      { name: "JPA", level: 1 },
      { name: "Node.js", level: 1 },
      { name: "express", level: 1 },
      { name: "Nest.js", level: 1 },
      { name: "Prisma", level: 1 },
      { name: "PHP", level: 1 },
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
  {
    title: "DevOps",
    icon: <Wrench className="w-5 h-5" />,
    skills: [
      { name: "AWS - EC2, S3", level: 1 },
      { name: "MySQL", level: 1 },
    ],
  },
  {
    title: "Cooperation & Tools",
    icon: <Wrench className="w-5 h-5" />,
    skills: [
      { name: "VS Code", level: 2 },
      { name: "Eclipse (Spring)", level: 1 },
      { name: "Android Studio", level: 1 },
      { name: "Git", level: 2 },
      { name: "GitHub", level: 2 },
    ],
  },
];

const SkillBadge = ({ skill }: { skill: Skill }) => {
  return (
    <Badge variant="secondary" className="flex items-center gap-1">
      {skill.name}
      <span className="flex ml-1">
        {Array.from({ length: skill.level }).map((_, i) => (
          <Flame key={i} className="w-3 h-3 text-orange-500 fill-orange-500" />
        ))}
      </span>
    </Badge>
  );
};

const SkillsPage = () => {
  return (
    <PageContainer>
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-foreground mb-2">Skills</h1>
        <p className="text-muted-foreground text-lg">기술 스택 및 역량</p>
      </motion.header>

      <div className="grid gap-6 md:grid-cols-2">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-primary-sky/10 rounded-lg text-primary-sky">
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
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 text-center text-sm text-muted-foreground"
      >
        <span className="inline-flex items-center gap-1">
          <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
          숙련도 표시
        </span>
      </motion.div>
    </PageContainer>
  );
};

export default SkillsPage;
