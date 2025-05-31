import { cn } from "@/lib/utils";
import { TooltipProvider } from "./ui/tooltip";

export const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main
      className={cn(
        "pt-14 pb-4 px-40",
        "flex items-center justify-between",
        "relative break-words h-dvh min-h-screen max-md:p-4 bg-transparent max-sm:pt-20",
        "bg-[radial-gradient(#88888830_1px,transparent_1px)] [background-size:24px_24px]"
      )}
    >
      <TooltipProvider>{children}</TooltipProvider>
    </main>
  );
};
