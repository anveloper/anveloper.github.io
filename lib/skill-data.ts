export type SkillLevel = 1 | 2 | 3;

export type Skill = {
  name: string;
  level: SkillLevel;
};

export type SkillCategory = {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
};

type BadgeInfo = {
  logo: string;
  color: string;
  logoColor: string;
};

const SKILL_BADGE_MAP: Record<string, BadgeInfo> = {
  "Next.js": { logo: "Next.js", color: "000000", logoColor: "white" },
  React: { logo: "React", color: "61DAFB", logoColor: "white" },
  TypeScript: { logo: "TypeScript", color: "3178C6", logoColor: "white" },
  "JavaScript (ES6)": { logo: "JavaScript", color: "F7DF1E", logoColor: "black" },
  HTML5: { logo: "HTML5", color: "E34F26", logoColor: "white" },
  CSS3: { logo: "CSS3", color: "1572B6", logoColor: "white" },
  "Tailwind CSS": { logo: "TailwindCSS", color: "06B6D4", logoColor: "white" },
  Prisma: { logo: "Prisma", color: "2D3748", logoColor: "white" },
  Java: { logo: "OpenJDK", color: "ED8B00", logoColor: "white" },
  "Spring Boot": { logo: "SpringBoot", color: "6DB33F", logoColor: "white" },
  JPA: { logo: "Hibernate", color: "59666C", logoColor: "white" },
  "Node.js": { logo: "Node.js", color: "339933", logoColor: "white" },
  "Nest.js": { logo: "NestJS", color: "E0234E", logoColor: "white" },
  Redis: { logo: "Redis", color: "DC382D", logoColor: "white" },
  Kafka: { logo: "ApacheKafka", color: "231F20", logoColor: "white" },
  "AWS (EC2, S3)": { logo: "AmazonWebServices", color: "232F3E", logoColor: "FF9900" },
  Caddy: { logo: "Caddy", color: "1F88C0", logoColor: "white" },
  MySQL: { logo: "MySQL", color: "4479A1", logoColor: "white" },
  "Naver Cloud": { logo: "Naver", color: "03C75A", logoColor: "white" },
  "VS Code": { logo: "VisualStudioCode", color: "007ACC", logoColor: "white" },
  "IntelliJ IDEA": { logo: "IntelliJIDEA", color: "000000", logoColor: "white" },
  Git: { logo: "Git", color: "F05032", logoColor: "white" },
  Figma: { logo: "Figma", color: "F24E1E", logoColor: "white" },
  Notion: { logo: "Notion", color: "000000", logoColor: "white" },
  Kotlin: { logo: "Kotlin", color: "7F52FF", logoColor: "white" },
  "Jetpack Compose": { logo: "JetpackCompose", color: "4285F4", logoColor: "white" },

  // Project tags
  Redux: { logo: "Redux", color: "764ABC", logoColor: "white" },
  "Socket.io": { logo: "Socket.io", color: "010101", logoColor: "white" },
  Solidity: { logo: "Solidity", color: "363636", logoColor: "white" },
  IPFS: { logo: "IPFS", color: "65C2CB", logoColor: "white" },
  Vite: { logo: "Vite", color: "646CFF", logoColor: "white" },
  Zustand: { logo: "Zustand", color: "433E38", logoColor: "white" },
  "TanStack Query": { logo: "ReactQuery", color: "FF4154", logoColor: "white" },
  NextAuth: { logo: "NextAuth", color: "000000", logoColor: "white" },
  "AWS S3": { logo: "AmazonS3", color: "569A31", logoColor: "white" },
  S3: { logo: "AmazonS3", color: "569A31", logoColor: "white" },
  MariaDB: { logo: "MariaDB", color: "003545", logoColor: "white" },
  MDX: { logo: "MDX", color: "1B1F24", logoColor: "white" },
  PWA: { logo: "PWA", color: "5A0FC8", logoColor: "white" },
  "React Router": { logo: "ReactRouter", color: "CA4245", logoColor: "white" },
  "Vue.js": { logo: "Vue.js", color: "4FC08D", logoColor: "white" },
  "Chart.js": { logo: "Chart.js", color: "FF6384", logoColor: "white" },
  Firebase: { logo: "Firebase", color: "DD2C00", logoColor: "white" },
  "Web3.js": { logo: "Web3.js", color: "F16822", logoColor: "white" },
  "Bootstrap Vue": { logo: "Bootstrap", color: "7952B3", logoColor: "white" },
  Recoil: { logo: "Recoil", color: "3578E5", logoColor: "white" },
};

export function getShieldUrl(skillName: string): string | null {
  const badge = SKILL_BADGE_MAP[skillName];
  if (!badge) return null;
  const label = encodeURIComponent(skillName);
  return `https://img.shields.io/badge/-${label}-${badge.color}?style=flat&logo=${badge.logo}&logoColor=${badge.logoColor}`;
}
