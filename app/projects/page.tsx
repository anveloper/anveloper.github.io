import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

const projectsDirectory = path.join(process.cwd(), '_projects');

async function getProjects() {
  try {
    const filenames = await fs.readdir(projectsDirectory);
    const projects = await Promise.all(
      filenames
        .filter(filename => filename.endsWith('.mdx'))
        .map(async filename => {
          const filePath = path.join(projectsDirectory, filename);
          const fileContents = await fs.readFile(filePath, 'utf8');
          const { data } = matter(fileContents);
          return {
            slug: filename.replace(/\.mdx$/, ''),
            frontmatter: data,
          };
        })
    );
    // Sort projects by date in descending order
    return projects.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
  } catch (error) {
    if (error instanceof Error && 'code' in error && (error as { code: string }).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      <ul className="space-y-4">
        {projects.map(project => (
          <li key={project.slug}>
            <Link href={`/projects/${project.slug}`} className="block p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <h2 className="text-2xl font-bold">{project.frontmatter.title}</h2>
              <p className="text-gray-500">{project.frontmatter.date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}