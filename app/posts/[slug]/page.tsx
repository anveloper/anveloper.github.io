import { getAllPosts, getPostBySlug } from "@/_posts";
import { PageContainer } from "@/components/page-container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mdxComponents } from "@/lib/mdx-components";
import { mdxOptions } from "@/lib/mdx-options";
import { Calendar, ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <PageContainer>
      <Link
        href="/posts"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>포스트 목록으로 돌아가기</span>
      </Link>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {post.frontmatter.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{post.frontmatter.date}</span>
            </div>
          </div>

          {post.frontmatter.tags && (
            <div className="flex flex-wrap gap-2">
              {(post.frontmatter.tags as string[]).map((tag) => (
                <Badge key={tag} variant="sky">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={post.content} components={mdxComponents} options={mdxOptions} />
      </article>
    </PageContainer>
  );
}
