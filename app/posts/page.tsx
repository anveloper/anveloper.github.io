import { getAllPosts } from "@/_posts";
import { PageContainer } from "@/components/page-container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, FileText } from "lucide-react";
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
        <Card>
          <CardContent className="pt-6 flex flex-col items-center">
            <FileText className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-center text-muted-foreground">아직 작성된 포스트가 없습니다.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <Card className="hover:border-primary-sky/50 hover:shadow-md transition-all group cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-primary-sky transition-colors mb-2">
                        {post.frontmatter.title}
                      </CardTitle>
                      {post.frontmatter.description && (
                        <CardDescription className="line-clamp-2">{post.frontmatter.description}</CardDescription>
                      )}
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-sky group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{post.frontmatter.date}</span>
                    </div>
                    {post.frontmatter.tags && (
                      <div className="flex flex-wrap gap-1">
                        {(post.frontmatter.tags as string[]).slice(0, 3).map((tag) => (
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
