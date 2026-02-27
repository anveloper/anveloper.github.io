import { getAllPosts } from "@/_posts";
import { PostItems } from "@/app/posts/post-items";
import { PageContainer } from "@/components/page-container";
import { Pagination } from "@/components/pagination";

const PAGE_SIZE = 10;

export default async function PostsPage() {
  const posts = await getAllPosts();
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const paged = posts.slice(0, PAGE_SIZE);

  return (
    <PageContainer>
      <header className="mb-10">
        <h1 className="text-xl font-semibold text-foreground tracking-tight">Posts</h1>
        <p className="text-sm text-muted-foreground mt-1">기술 블로그 포스트</p>
      </header>

      <PostItems posts={paged} />
      <Pagination currentPage={1} totalPages={totalPages} basePath="/posts" />
    </PageContainer>
  );
}
