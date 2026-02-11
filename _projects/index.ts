import { promises as fs } from "fs";
import matter from "gray-matter";
import path from "path";

const directory = path.join(process.cwd(), "_projects");

// "20260108-dps-store" → "dps-store"
function toSlug(filename: string): string {
  return filename.replace(/\.mdx$/, "").replace(/^\d{8}-/, "");
}

export async function getAllProjects() {
  const filenames = await fs.readdir(directory);
  const projects = await Promise.all(
    filenames
      .filter((f) => f.endsWith(".mdx"))
      .map(async (filename) => {
        const content = await fs.readFile(path.join(directory, filename), "utf8");
        const { data } = matter(content);
        return { slug: toSlug(filename), frontmatter: data };
      })
  );
  return projects.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export async function getProjectBySlug(slug: string) {
  const filenames = await fs.readdir(directory);
  const filename = filenames.find((f) => f.endsWith(".mdx") && toSlug(f) === slug);
  if (!filename) return null;
  const fileContents = await fs.readFile(path.join(directory, filename), "utf8");
  const { data, content } = matter(fileContents);
  return { frontmatter: data, content };
}
