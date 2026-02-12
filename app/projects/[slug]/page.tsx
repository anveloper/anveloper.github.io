import { getAllProjects, getProjectBySlug } from "@/_projects";
import { PageContainer } from "@/components/page-container";
import { TableOfContents } from "@/components/table-of-contents";
import { TechBadge } from "@/components/skill-badge";
import { Card, CardContent } from "@/components/ui/card";
import { mdxComponents } from "@/lib/mdx-components";
import { mdxOptions } from "@/lib/mdx-options";
import { extractToc } from "@/lib/toc";
import type { Metadata } from "next";
import { Calendar, ArrowLeft, ExternalLink, Github } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  const { title, description, tags } = project.frontmatter;
  const images = project.thumbnail ? [project.thumbnail] : undefined;

  return {
    title,
    description,
    keywords: tags as string[] | undefined,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/projects/${slug}`,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const tocItems = extractToc(project.content);

  return (
    <PageContainer>
      <TableOfContents items={tocItems} />
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>프로젝트 목록으로 돌아가기</span>
      </Link>

      {project.thumbnail && (
        <div className="relative w-full aspect-[1200/630] mb-8 rounded-lg overflow-hidden border border-border">
          <Image
            src={project.thumbnail}
            alt={project.frontmatter.title as string}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

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
                <TechBadge key={tag} name={tag} variant="sky" />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={project.content} components={mdxComponents} options={mdxOptions} />
      </article>
    </PageContainer>
  );
}
