import { getAllProjects } from "@/_projects";
import { PageContainer } from "@/components/page-container";
import { TechBadge } from "@/components/skill-badge";
import { FolderKanban } from "lucide-react";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <PageContainer>
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Projects</h1>
        <p className="text-muted-foreground text-lg">프로젝트 포트폴리오</p>
      </header>

      {projects.length === 0 ? (
        <div className="py-16 flex flex-col items-center">
          <FolderKanban className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">아직 등록된 프로젝트가 없습니다.</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="block group">
              <div className="py-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2">
                  <time className="text-sm text-muted-foreground shrink-0">
                    {project.frontmatter.date}
                  </time>
                  <div className="flex items-center gap-2">
                    {project.icon && (
                      <img src={project.icon} alt="" className="w-6 h-6 rounded" />
                    )}
                    <h2 className="text-xl font-semibold text-foreground group-hover:text-primary-sky transition-colors">
                      {project.frontmatter.title}
                    </h2>
                  </div>
                </div>
                {project.frontmatter.description && (
                  <p className="text-muted-foreground mb-3 sm:ml-24">
                    {project.frontmatter.description}
                  </p>
                )}
                {project.frontmatter.tags && (
                  <div className="flex flex-wrap gap-1 sm:ml-24">
                    {(project.frontmatter.tags as string[]).map((tag) => (
                      <TechBadge key={tag} name={tag} />
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
