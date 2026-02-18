import { getAllSolutions } from "@/_solutions";
import { PageContainer } from "@/components/page-container";
import { Badge } from "@/components/ui/badge";
import { Code } from "lucide-react";
import Link from "next/link";

const platformLabel: Record<string, string> = {
  boj: "BOJ",
  programmers: "Programmers",
};

export default async function SolutionsPage() {
  const solutions = await getAllSolutions();

  return (
    <PageContainer>
      <header className="mb-10">
        <h1 className="text-xl font-semibold text-foreground tracking-tight">Solutions</h1>
        <p className="text-sm text-muted-foreground mt-1">알고리즘 문제 풀이</p>
      </header>

      {solutions.length === 0 ? (
        <div className="py-16 flex flex-col items-center">
          <Code className="w-8 h-8 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">아직 작성된 풀이가 없습니다.</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {solutions.map((solution) => (
            <Link
              key={solution.slug}
              href={`/solutions/${solution.slug}`}
              className="block py-5 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-1">
                <time className="text-sm text-muted-foreground shrink-0">
                  {solution.frontmatter.date}
                </time>
                <h2 className="text-lg font-medium text-foreground group-hover:text-primary-sky transition-colors">
                  {solution.frontmatter.title}
                </h2>
              </div>
              {solution.frontmatter.description && (
                <p className="text-sm text-muted-foreground line-clamp-1 sm:ml-24">
                  {solution.frontmatter.description}
                </p>
              )}
              <div className="flex flex-wrap gap-1 mt-2 sm:ml-24">
                {solution.frontmatter.platform && (
                  <Badge variant="outline" className="text-xs">
                    {platformLabel[solution.frontmatter.platform as string] ?? solution.frontmatter.platform}
                  </Badge>
                )}
                {solution.frontmatter.difficulty && (
                  <Badge variant="outline" className="text-xs">
                    {solution.frontmatter.difficulty}
                  </Badge>
                )}
                {solution.frontmatter.language && (
                  <Badge variant="secondary" className="text-xs">
                    {solution.frontmatter.language}
                  </Badge>
                )}
                {solution.frontmatter.tags &&
                  (solution.frontmatter.tags as string[]).slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
