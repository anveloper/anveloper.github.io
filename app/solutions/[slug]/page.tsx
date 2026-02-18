import { getAllSolutions, getSolutionBySlug } from "@/_solutions";
import { PageContainer } from "@/components/page-container";
import { TableOfContents } from "@/components/table-of-contents";
import { Badge } from "@/components/ui/badge";
import { mdxComponents } from "@/lib/mdx-components";
import { mdxOptions } from "@/lib/mdx-options";
import { extractToc } from "@/lib/toc";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

const platformLabel: Record<string, string> = {
  boj: "BOJ",
  programmers: "Programmers",
};

export async function generateStaticParams() {
  const solutions = await getAllSolutions();
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);
  if (!solution) return {};

  const { title, description, tags } = solution.frontmatter;

  return {
    title,
    description,
    keywords: tags as string[] | undefined,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/solutions/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  const tocItems = extractToc(solution.content);
  const { frontmatter } = solution;

  return (
    <PageContainer>
      <TableOfContents items={tocItems} />
      <Link
        href="/solutions"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>풀이 목록으로 돌아가기</span>
      </Link>

      <header className="border-b border-border pb-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          {frontmatter.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span className="text-sm text-muted-foreground">{frontmatter.date}</span>
          {frontmatter.platform && (
            <Badge variant="outline">
              {platformLabel[frontmatter.platform as string] ?? frontmatter.platform}
            </Badge>
          )}
          {frontmatter.difficulty && (
            <Badge variant="outline">{frontmatter.difficulty}</Badge>
          )}
          {frontmatter.language && (
            <Badge variant="secondary">{frontmatter.language}</Badge>
          )}
        </div>

        {frontmatter.problem_url && (
          <Link
            href={frontmatter.problem_url as string}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary-sky hover:underline mb-4"
          >
            원본 문제 보기
            <ExternalLink className="w-3 h-3" />
          </Link>
        )}

        {frontmatter.tags && (
          <div className="flex flex-wrap gap-2">
            {(frontmatter.tags as string[]).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={solution.content} components={mdxComponents} options={mdxOptions} />
      </article>
    </PageContainer>
  );
}
