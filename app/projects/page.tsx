import { PageContainer } from "@/components/page-container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { promises as fs } from "fs";
import matter from "gray-matter";
import { ArrowRight, Calendar, FolderKanban } from "lucide-react";
import Link from "next/link";
import path from "path";

const projectsDirectory = path.join(process.cwd(), "_projects");

async function getProjects() {
  try {
    const filenames = await fs.readdir(projectsDirectory);
    const projects = await Promise.all(
      filenames
        .filter((filename) => filename.endsWith(".mdx"))
        .map(async (filename) => {
          const filePath = path.join(projectsDirectory, filename);
          const fileContents = await fs.readFile(filePath, "utf8");
          const { data } = matter(fileContents);
          return {
            slug: filename.replace(/\.mdx$/, ""),
            frontmatter: data,
          };
        })
    );
    return projects.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
  } catch (error) {
    if (error instanceof Error && "code" in error && (error as { code: string }).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <PageContainer>
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Projects</h1>
        <p className="text-muted-foreground text-lg">프로젝트 포트폴리오</p>
      </header>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="pt-6 flex flex-col items-center">
            <FolderKanban className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-center text-muted-foreground">아직 등록된 프로젝트가 없습니다.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <Card className="h-full hover:border-primary-sky/50 hover:shadow-md transition-all group cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-xl group-hover:text-primary-sky transition-colors">
                      {project.frontmatter.title}
                    </CardTitle>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-sky group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                  {project.frontmatter.description && (
                    <CardDescription className="line-clamp-2">{project.frontmatter.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{project.frontmatter.date}</span>
                    </div>
                    {project.frontmatter.tags && (
                      <div className="flex flex-wrap gap-1">
                        {(project.frontmatter.tags as string[]).slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
