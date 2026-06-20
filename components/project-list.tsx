"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";
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

  const allTags = Array.from(new Set(projects.flatMap((p) => (p.frontmatter.tags as string[]) ?? []))).sort();

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const filtered =
    selectedTags.length === 0
      ? projects
      : projects.filter((p) => ((p.frontmatter.tags as string[]) ?? []).some((t) => selectedTags.includes(t)));

  return (
    <>
      <PageHeader
        title="Projects"
        description="프로젝트 포트폴리오"
        action={
          allTags.length > 0 && (
            <div className="flex items-center gap-1.5 shrink-0">
              {selectedTags.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedTags([])}
                  aria-label="필터 초기화"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowFilter((v) => !v)}
                aria-label={showFilter ? "필터 닫기" : "필터 열기"}
                aria-expanded={showFilter}
                className="relative w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
              >
                <ListFilter className="w-4 h-4" />
                {selectedTags.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
                    {selectedTags.length}
                  </span>
                )}
              </button>
            </div>
          )
        }
      />

      {showFilter && allTags.length > 0 && (
        <div role="group" aria-label="기술 태그 필터" className="flex flex-wrap gap-1.5 mb-8">
          {allTags.map((tag) => (
            <button key={tag} type="button" onClick={() => toggleTag(tag)}>
              <Badge variant={selectedTags.includes(tag) ? "default" : "outline"} className="cursor-pointer text-xs">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group flex flex-col gap-3 p-4 bg-secondary/50 rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                {project.icon && <img src={project.icon} alt="" className="w-10 h-10 rounded-md shrink-0" />}
                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-medium text-foreground group-hover:text-primary-sky transition-colors truncate">
                    {project.frontmatter.title as string}
                  </h2>
                  <time
                    dateTime={(project.frontmatter.date as string).replace(/\./g, "-")}
                    className="text-xs text-muted-foreground"
                  >
                    {project.frontmatter.date as string}
                  </time>
                </div>
              </div>
              {typeof project.frontmatter.description === "string" && (
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {project.frontmatter.description}
                </p>
              )}
              {Array.isArray(project.frontmatter.tags) && (
                <div className="flex flex-wrap gap-1 mt-auto">
                  {(project.frontmatter.tags as string[]).slice(0, 5).map((tag) => (
                    <TechBadge key={tag} name={tag} />
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
