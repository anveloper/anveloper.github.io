import { mdxComponents } from "@/lib/mdx-components";
import { promises as fs } from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import path from "path";

const postsDirectory = path.join(process.cwd(), "_posts");

export async function generateStaticParams() {
  try {
    const filenames = await fs.readdir(postsDirectory);
    return filenames
      .filter((filename) => filename.endsWith(".mdx"))
      .map((filename) => ({
        slug: filename.replace(/\.mdx$/, ""),
      }));
  } catch (error) {
    // If the directory doesn't exist, return an empty array
    if (error instanceof Error && "code" in error && (error as { code: string }).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function getPost(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      frontmatter: data,
      content,
    };
  } catch (error) {
    if (error instanceof Error && "code" in error && (error as { code: string }).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post.frontmatter.title}</h1>
        <p className="text-gray-500">{post.frontmatter.date}</p>
      </header>
      {/* For rich text styling, consider adding the @tailwindcss/typography plugin */}
      <div className="prose max-w-none">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  );
}
