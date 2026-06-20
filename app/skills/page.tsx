import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { SkillBadge } from "@/components/skill-badge";
import { skillCategories } from "@/lib/skill-data";

const SkillsPage = () => {
  return (
    <PageContainer>
      <PageHeader title="Skills" description="기술 스택 및 역량" />

      <div className="space-y-4">
        {skillCategories.map((category) => (
          <div key={category.title} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <span className="text-sm font-medium text-foreground w-28 sm:text-right shrink-0 pt-0.5">
              {category.title}
            </span>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <SkillBadge key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default SkillsPage;
