import { getAllProjects } from "@/_projects";
import { HomeView } from "@/app/home-view";
import { categoryGroups, featuredProjects, type HomeProjectGroup } from "@/lib/featured-projects";

const HomePage = async () => {
  const all = await getAllProjects();
  const bySlug = new Map(all.map((p) => [p.slug, p]));

  // _projects(MDX)를 단일 소스로, featured-projects의 순서·단축 설명을 덧입히고
  // frontmatter의 category로 그룹화한다 (빌드 타임, 정적 export)
  const groupedProjects: HomeProjectGroup[] = categoryGroups
    .map((group) => ({
      key: group.key,
      label: group.label,
      projects: featuredProjects
        .map((f) => {
          const p = bySlug.get(f.slug);
          if (!p || p.frontmatter.category !== group.key) return null;
          return {
            slug: f.slug,
            title: p.frontmatter.title as string,
            summary: f.summary,
            tags: (p.frontmatter.tags as string[]) ?? [],
            icon: p.icon,
          };
        })
        .filter((p): p is HomeProjectGroup["projects"][number] => p !== null),
    }))
    .filter((group) => group.projects.length > 0);

  return <HomeView groupedProjects={groupedProjects} />;
};

export default HomePage;
