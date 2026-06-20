import { getAllProjects } from "@/_projects";
import { HomeView } from "@/app/home-view";
import { featuredProjects, type HomeProject } from "@/lib/featured-projects";

const HomePage = async () => {
  const all = await getAllProjects();
  const bySlug = new Map(all.map((p) => [p.slug, p]));

  // _projects(MDX)를 단일 소스로, featured-projects의 순서·단축 설명만 덧입힌다
  const projects: HomeProject[] = featuredProjects
    .map((f) => {
      const p = bySlug.get(f.slug);
      if (!p) return null;
      return {
        slug: f.slug,
        title: p.frontmatter.title as string,
        summary: f.summary,
        tags: (p.frontmatter.tags as string[]) ?? [],
        icon: p.icon,
      };
    })
    .filter((p): p is HomeProject => p !== null);

  return <HomeView featuredProjects={projects} />;
};

export default HomePage;
