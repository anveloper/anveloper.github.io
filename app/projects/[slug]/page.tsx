import { PageContainer } from "@/components/page-container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mdxComponents } from "@/lib/mdx-components";
import { promises as fs } from "fs";
import matter from "gray-matter";
import { Calendar, ArrowLeft, ExternalLink, Github } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";

const projectsDirectory = path.join(process.cwd(), "_projects");

export async function generateStaticParams() {
  try {
    const filenames = await fs.readdir(projectsDirectory);
    return filenames
      .filter((filename) => filename.endsWith(".mdx"))
      .map((filename) => ({
        slug: filename.replace(/\.mdx$/, ""),
      }));
  } catch (error) {
    if (error instanceof Error && "code" in error && (error as { code: string }).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function getProject(slug: string) {
  const filePath = path.join(projectsDirectory, `${slug}.mdx`);
  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      frontmatter: data,
      content,
    };
  } catch (error) {
    if (error instanceof Error && "code" in error && (error as { code: string }).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <PageContainer>
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>프로젝트 목록으로 돌아가기</span>
      </Link>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {project.frontmatter.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{project.frontmatter.date}</span>
            </div>

            {project.frontmatter.github && (
              <a
                href={project.frontmatter.github as string}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            )}

            {project.frontmatter.demo && (
              <a
                href={project.frontmatter.demo as string}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Demo</span>
              </a>
            )}
          </div>

          {project.frontmatter.tags && (
            <div className="flex flex-wrap gap-2">
              {(project.frontmatter.tags as string[]).map((tag) => (
                <Badge key={tag} variant="sky">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={project.content} components={mdxComponents} />
      </article>
    </PageContainer>
  );
}
