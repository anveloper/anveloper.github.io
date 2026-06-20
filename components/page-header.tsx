import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description?: string;
  /** 헤더 우측에 배치할 액션 영역 (필터 버튼 등) */
  action?: React.ReactNode;
  className?: string;
};

/** 내부 페이지 공용 헤더 — 페이지 타이틀 + 서브타이틀 단일 소스 */
export const PageHeader = ({ title, description, action, className }: PageHeaderProps) => {
  return (
    <header className={cn("mb-10 flex items-start justify-between gap-4", className)}>
      <div>
        <h1 className="text-xl font-semibold text-foreground tracking-tight">{title}</h1>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      {action}
    </header>
  );
};
