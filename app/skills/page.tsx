import { PageContainer } from "@/components/page-container";
import { SkillBadge } from "@/components/skill-badge";
import type { SkillCategory } from "@/lib/skill-data";

const skillCategories: SkillCategory[] = [
  {
    title: "Front-End",
    skills: [
      { name: "Next.js", level: 3 },
      { name: "React", level: 3 },
      { name: "TypeScript", level: 3 },
      { name: "JavaScript (ES6)", level: 3 },
      { name: "HTML5", level: 3 },
      { name: "CSS3", level: 3 },
      { name: "Tailwind CSS", level: 2 },
    ],
  },
  {
    title: "Back-End",
    skills: [
      { name: "Prisma", level: 3 },
      { name: "Java", level: 2 },
      { name: "Spring Boot", level: 2 },
      { name: "JPA", level: 2 },
      { name: "Node.js", level: 1 },
      { name: "Nest.js", level: 1 },
      { name: "Redis", level: 1 },
      { name: "Kafka", level: 1 },
    ],
  },
  {
    title: "DevOps",
    skills: [
      { name: "AWS (EC2, S3)", level: 2 },
      { name: "Caddy", level: 2 },
      { name: "MySQL", level: 2 },
      { name: "Naver Cloud", level: 1 },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "VS Code", level: 2 },
      { name: "IntelliJ IDEA", level: 2 },
      { name: "Git", level: 2 },
      { name: "Figma", level: 1 },
      { name: "Notion", level: 1 },
    ],
  },
  {
    title: "Android",
    skills: [
      { name: "Kotlin", level: 1 },
      { name: "Jetpack Compose", level: 1 },
    ],
  },
];

const SkillsPage = () => {
  return (
    <PageContainer>
      <header className="mb-10">
        <h1 className="text-xl font-semibold text-foreground tracking-tight">Skills</h1>
        <p className="text-sm text-muted-foreground mt-1">기술 스택 및 역량</p>
      </header>

      <div className="space-y-4">
        {skillCategories.map((category) => (
          <div key={category.title} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <span className="text-sm font-medium text-foreground w-28 sm:text-right shrink-0 pt-0.5">
              {category.title}
            </span>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <SkillBadge key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default SkillsPage;
