import { existsSync, promises as fs } from "fs";
import matter from "gray-matter";
import path from "path";

const directory = path.join(process.cwd(), "_projects");
const imageDir = path.join(process.cwd(), "public", "images", "projects");

function findImage(slug: string, name: string): string | null {
  for (const ext of ["webp", "png", "jpg", "svg"]) {
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

/**
 * frontmatter에 `unlisted: true`면 목록·sitemap·이전/다음 네비게이션에서 제외된다.
 * 상세 페이지 자체는 계속 빌드되므로 URL로 직접 접근하면 열린다.
 * 정적 페이지를 만드는 generateStaticParams만 `includeUnlisted: true`로 호출한다.
 */
export async function getAllProjects({ includeUnlisted = false }: { includeUnlisted?: boolean } = {}) {
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
  return projects
    .filter((p) => includeUnlisted || !p.frontmatter.unlisted)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export async function getProjectBySlug(slug: string) {
  const filenames = await fs.readdir(directory);
  const filename = filenames.find((f) => f.endsWith(".mdx") && toSlug(f) === slug);
  if (!filename) return null;
  const fileContents = await fs.readFile(path.join(directory, filename), "utf8");
  const { data, content } = matter(fileContents);
  return { slug, frontmatter: data, content, thumbnail: findImage(slug, "thumbnail"), icon: findImage(slug, "icon") };
}
