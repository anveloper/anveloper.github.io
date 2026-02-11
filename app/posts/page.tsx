import { getAllPosts } from "@/_posts";
import { PageContainer } from "@/components/page-container";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import Link from "next/link";

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <PageContainer>
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Posts</h1>
        <p className="text-muted-foreground text-lg">기술 블로그 포스트</p>
      </header>

      {posts.length === 0 ? (
        <div className="py-16 flex flex-col items-center">
          <FileText className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">아직 작성된 포스트가 없습니다.</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="block py-5 group"
            >
              <div className="flex items-baseline gap-4 mb-1">
                <time className="text-sm text-muted-foreground shrink-0">
                  {post.frontmatter.date}
                </time>
                <h2 className="text-lg font-medium text-foreground group-hover:text-primary-sky transition-colors">
                  {post.frontmatter.title}
                </h2>
              </div>
              {post.frontmatter.description && (
                <p className="text-sm text-muted-foreground line-clamp-1 ml-24">
                  {post.frontmatter.description}
                </p>
              )}
              {post.frontmatter.tags && (
                <div className="flex flex-wrap gap-1 mt-2 ml-24">
                  {(post.frontmatter.tags as string[]).slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
