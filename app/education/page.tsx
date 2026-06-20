import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { timeline } from "@/lib/timeline-data";
import { cn } from "@/lib/utils";

const EducationPage = () => {
  return (
    <PageContainer>
      <PageHeader title="Education & Experience" description="학력 및 경력 사항" />

      <div className="space-y-0">
        {timeline.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className={cn(
              "flex flex-col sm:flex-row gap-1 sm:gap-6 py-4",
              index < timeline.length - 1 && "border-b border-border/60"
            )}
          >
            <span className="text-sm text-muted-foreground tabular-nums w-36 shrink-0">{item.period}</span>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <span className="text-sm text-primary-sky">{item.organization}</span>
              </div>
              {item.description && (
                <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">{item.description}</p>
              )}
              {item.badges && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default EducationPage;
