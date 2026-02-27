import { getAllPosts, getPostBySlug } from "@/_posts";
import { PostItems } from "@/app/posts/post-items";
import { GiscusComments } from "@/components/giscus-comments";
import { PageContainer } from "@/components/page-container";
import { Pagination } from "@/components/pagination";
import { TableOfContents } from "@/components/table-of-contents";
import { Badge } from "@/components/ui/badge";
import { mdxComponents } from "@/lib/mdx-components";
import { mdxOptions } from "@/lib/mdx-options";
import { extractToc } from "@/lib/toc";
import { NotFoundView } from "@/components/not-found-view";
import { ArrowLeft, FileText } from "lucide-react";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

const PAGE_SIZE = 10;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  return [
    ...posts.map((p) => ({ slug: p.slug })),
    ...Array.from({ length: totalPages - 1 }, (_, i) => ({ slug: String(i + 2) })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  if (/^\d+$/.test(slug)) {
    return { title: `Posts - ${slug}페이지` };
  }

  const post = await getPostBySlug(slug);
  if (!post) return {};

  const { title, description, tags } = post.frontmatter;

  return {
    title,
    description,
    keywords: tags as string[] | undefined,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/posts/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (/^\d+$/.test(slug)) {
    const page = Number(slug);
    const posts = await getAllPosts();
    const totalPages = Math.ceil(posts.length / PAGE_SIZE);

    if (page < 2 || page > totalPages) {
      return (
        <NotFoundView
          icon={FileText}
          title="포스트를 찾을 수 없습니다"
          description="요청하신 페이지가 존재하지 않습니다."
          href="/posts"
          linkLabel="포스트 목록으로 돌아가기"
        />
      );
    }

    const paged = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
      <PageContainer>
        <header className="mb-10">
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Posts</h1>
          <p className="text-sm text-muted-foreground mt-1">기술 블로그 포스트</p>
        </header>

        <PostItems posts={paged} />
        <Pagination currentPage={page} totalPages={totalPages} basePath="/posts" />
      </PageContainer>
    );
  }

  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <NotFoundView
        icon={FileText}
        title="포스트를 찾을 수 없습니다"
        description="요청하신 포스트가 존재하지 않거나 삭제되었습니다."
        href="/posts"
        linkLabel="포스트 목록으로 돌아가기"
      />
    );
  }

  const tocItems = extractToc(post.content);

  return (
    <PageContainer>
      <TableOfContents items={tocItems} />
      <Link
        href="/posts"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>포스트 목록으로 돌아가기</span>
      </Link>

      <header className="border-b border-border pb-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{post.frontmatter.title}</h1>

        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span className="text-sm text-muted-foreground">{post.frontmatter.date}</span>
        </div>

        {post.frontmatter.tags && (
          <div className="flex flex-wrap gap-2">
            {(post.frontmatter.tags as string[]).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={post.content} components={mdxComponents} options={mdxOptions} />
      </article>

      <GiscusComments />
    </PageContainer>
  );
}
