import { getAllPosts } from "@/_posts";
import { getAllProjects } from "@/_projects";
import { getAllSolutions } from "@/_solutions";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://anveloper.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const projects = await getAllProjects();
  const solutions = await getAllSolutions();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/skills`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/education`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/overview`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/posts`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/projects`, changeFrequency: "weekly", priority: 0.9 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(project.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const solutionPages: MetadataRoute.Sitemap = solutions.map((solution) => ({
    url: `${BASE_URL}/solutions/${solution.slug}`,
    lastModified: new Date(solution.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...postPages, ...projectPages, ...solutionPages];
}
