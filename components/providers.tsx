"use client";

import { TooltipProvider } from "./ui/tooltip";

export const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <TooltipProvider>{children}</TooltipProvider>;
};
