"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TechBadge } from "@/components/skill-badge";
import { FolderKanban, ListFilter, X } from "lucide-react";

type Project = {
  slug: string;
  frontmatter: Record<string, unknown>;
  thumbnail: string | null;
  icon: string | null;
};

export const ProjectList = ({ projects }: { projects: Project[] }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(
    new Set(projects.flatMap((p) => (p.frontmatter.tags as string[]) ?? []))
  ).sort();

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filtered =
    selectedTags.length === 0
      ? projects
      : projects.filter((p) =>
          ((p.frontmatter.tags as string[]) ?? []).some((t) =>
            selectedTags.includes(t)
          )
        );

  return (
    <>
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">프로젝트 포트폴리오</p>
        </div>
        {allTags.length > 0 && (
          <div className="flex items-center gap-1.5">
            {selectedTags.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedTags([])}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowFilter((v) => !v)}
              className="relative w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <ListFilter className="w-4 h-4" />
              {selectedTags.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
                  {selectedTags.length}
                </span>
              )}
            </button>
          </div>
        )}
      </header>

      {showFilter && allTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-8">
          {allTags.map((tag) => (
            <button key={tag} type="button" onClick={() => toggleTag(tag)}>
              <Badge
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer text-xs"
              >
                {tag}
              </Badge>
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="py-16 flex flex-col items-center">
          <FolderKanban className="w-8 h-8 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            {selectedTags.length > 0
              ? "선택한 태그에 해당하는 프로젝트가 없습니다."
              : "아직 등록된 프로젝트가 없습니다."}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {filtered.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block group"
            >
              <div className="py-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2">
                  <time className="text-sm text-muted-foreground shrink-0">
                    {project.frontmatter.date as string}
                  </time>
                  <div className="flex items-center gap-2">
                    {project.icon && (
                      <img
                        src={project.icon}
                        alt=""
                        className="w-6 h-6 rounded"
                      />
                    )}
                    <h2 className="text-lg font-medium text-foreground group-hover:text-primary-sky transition-colors">
                      {project.frontmatter.title as string}
                    </h2>
                  </div>
                </div>
                {typeof project.frontmatter.description === "string" && (
                  <p className="text-muted-foreground mb-3 sm:ml-24">
                    {project.frontmatter.description}
                  </p>
                )}
                {Array.isArray(project.frontmatter.tags) && (
                  <div className="flex flex-wrap gap-1 sm:ml-24">
                    {(project.frontmatter.tags as string[])
                      .slice(0, 5)
                      .map((tag) => (
                        <TechBadge key={tag} name={tag} />
                      ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
