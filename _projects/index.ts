import { existsSync, promises as fs } from "fs";
import matter from "gray-matter";
import path from "path";

const directory = path.join(process.cwd(), "_projects");
const imageDir = path.join(process.cwd(), "public", "images", "projects");

function findImage(slug: string, name: string): string | null {
  for (const ext of ["png", "jpg", "svg"]) {
    if (existsSync(path.join(imageDir, slug, `${name}.${ext}`))) {
      return `/images/projects/${slug}/${name}.${ext}`;
    }
  }
  return null;
}

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
        const slug = toSlug(filename);
        return { slug, frontmatter: data, thumbnail: findImage(slug, "thumbnail"), icon: findImage(slug, "icon") };
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
  return { slug, frontmatter: data, content, thumbnail: findImage(slug, "thumbnail"), icon: findImage(slug, "icon") };
}
