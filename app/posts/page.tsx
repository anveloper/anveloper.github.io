import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

const postsDirectory = path.join(process.cwd(), '_posts');

async function getPosts() {
  try {
    const filenames = await fs.readdir(postsDirectory);
    const posts = await Promise.all(
      filenames
        .filter(filename => filename.endsWith('.mdx'))
        .map(async filename => {
          const filePath = path.join(postsDirectory, filename);
          const fileContents = await fs.readFile(filePath, 'utf8');
          const { data } = matter(fileContents);
          return {
            slug: filename.replace(/\.mdx$/, ''),
            frontmatter: data,
          };
        })
    );
    // Sort posts by date in descending order
    return posts.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
  } catch (error) {
    if (error instanceof Error && 'code' in error && (error as { code: string }).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="block p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <h2 className="text-2xl font-bold">{post.frontmatter.title}</h2>
              <p className="text-gray-500">{post.frontmatter.date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
