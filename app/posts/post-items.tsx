import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import Link from "next/link";

type Post = {
  slug: string;
  frontmatter: Record<string, unknown>;
};

export const PostItems = ({ posts }: { posts: Post[] }) => {
  if (posts.length === 0) {
    return (
      <div className="py-16 flex flex-col items-center">
        <FileText className="w-8 h-8 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">아직 작성된 포스트가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/posts/${post.slug}`}
          className="block py-5 group"
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-1">
            <time className="text-sm text-muted-foreground shrink-0">
              {post.frontmatter.date as string}
            </time>
            <h2 className="text-lg font-medium text-foreground group-hover:text-primary-sky transition-colors">
              {post.frontmatter.title as string}
            </h2>
          </div>
          {typeof post.frontmatter.description === "string" && (
            <p className="text-sm text-muted-foreground line-clamp-1 sm:ml-24">
              {post.frontmatter.description}
            </p>
          )}
          {Array.isArray(post.frontmatter.tags) && (
            <div className="flex flex-wrap gap-1 mt-2 sm:ml-24">
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
  );
};
