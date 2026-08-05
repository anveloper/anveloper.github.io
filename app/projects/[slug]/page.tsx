import { getAllProjects, getProjectBySlug } from "@/_projects";
import { NotFoundView } from "@/components/not-found-view";
import { PageContainer } from "@/components/page-container";
import { TechBadge } from "@/components/skill-badge";
import { TableOfContents } from "@/components/table-of-contents";
import { mdxComponents } from "@/lib/mdx-components";
import { mdxOptions } from "@/lib/mdx-options";
import { extractToc } from "@/lib/toc";
import { PostNavigation } from "@/components/post-navigation";
import { ArrowLeft, ExternalLink, FolderKanban } from "lucide-react";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  // unlisted 프로젝트도 정적 페이지는 만들어야 URL 직접 접근이 동작한다
  const projects = await getAllProjects({ includeUnlisted: true });
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
  const [project, projects] = await Promise.all([getProjectBySlug(slug), getAllProjects()]);

  if (!project) {
    return (
      <NotFoundView
        icon={FolderKanban}
        title="프로젝트를 찾을 수 없습니다"
        description="요청하신 프로젝트가 존재하지 않거나 삭제되었습니다."
        href="/projects"
        linkLabel="프로젝트 목록으로 돌아가기"
      />
    );
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
        <div className="relative w-full aspect-1200/630 mb-8 rounded-lg overflow-hidden border border-border">
          <Image
            src={project.thumbnail}
            alt={project.frontmatter.title as string}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <header className="border-b border-border pb-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{project.frontmatter.title}</h1>

        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span className="text-sm text-muted-foreground">{project.frontmatter.date}</span>

          {project.frontmatter.github && (
            <a
              href={project.frontmatter.github as string}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
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
              <TechBadge key={tag} name={tag} />
            ))}
          </div>
        )}

        {(() => {
          // 기간·인원·기여도·역할·AI — frontmatter에 있는 항목만 노출한다
          const meta = [
            { label: "개발 기간", value: project.frontmatter.period },
            { label: "개발 인원", value: project.frontmatter.team },
            { label: "기여도", value: project.frontmatter.contribution },
            { label: "담당 역할", value: project.frontmatter.role },
            { label: "AI 적용", value: project.frontmatter.ai },
          ].filter((m): m is { label: string; value: string } => typeof m.value === "string" && m.value.length > 0);

          if (meta.length === 0) return null;

          return (
            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 border-t border-border pt-5">
              {meta.map((m) => (
                <div key={m.label} className="flex gap-3 text-sm">
                  <dt className="shrink-0 w-20 font-semibold text-muted-foreground">{m.label}</dt>
                  <dd className="text-foreground">{m.value}</dd>
                </div>
              ))}
            </dl>
          );
        })()}
      </header>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={project.content} components={mdxComponents} options={mdxOptions} />
      </article>

      {(() => {
        const idx = projects.findIndex((p) => p.slug === slug);
        // unlisted 프로젝트는 목록에 없어 idx가 -1이다. 엉뚱한 이웃이 붙지 않도록 네비게이션을 생략한다
        if (idx === -1) return null;
        const prev = projects[idx + 1] ?? null;
        const next = projects[idx - 1] ?? null;
        return (
          <PostNavigation
            prev={prev ? { slug: prev.slug, title: prev.frontmatter.title as string } : null}
            next={next ? { slug: next.slug, title: next.frontmatter.title as string } : null}
            basePath="/projects"
          />
        );
      })()}
    </PageContainer>
  );
}
