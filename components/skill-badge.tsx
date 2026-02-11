import { Badge } from "@/components/ui/badge";
import { getShieldUrl } from "@/lib/skill-data";
import type { Skill } from "@/lib/skill-data";
import { Flame } from "lucide-react";

export const SkillBadge = ({ skill }: { skill: Skill }) => {
  const shieldUrl = getShieldUrl(skill.name);

  return (
    <span className="inline-flex items-center gap-1 rounded-md ring-1 ring-border/50 pr-1">
      {shieldUrl ? (
        <img src={shieldUrl} alt={skill.name} className="h-5" loading="lazy" />
      ) : (
        <Badge variant="secondary">{skill.name}</Badge>
      )}
      <span className="flex">
        {Array.from({ length: skill.level }).map((_, i) => (
          <Flame key={i} className="w-3 h-3 text-orange-500 fill-orange-500" />
        ))}
      </span>
    </span>
  );
};

export const TechBadge = ({ name, variant = "secondary" }: { name: string; variant?: "secondary" | "sky" }) => {
  const shieldUrl = getShieldUrl(name);

  if (shieldUrl) {
    return (
      <span className="inline-flex rounded-md ring-1 ring-border/50">
        <img src={shieldUrl} alt={name} className="h-5" loading="lazy" />
      </span>
    );
  }

  return (
    <Badge variant={variant} className="text-xs">
      {name}
    </Badge>
  );
};
