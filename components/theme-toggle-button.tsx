"use client";

import { useMounted } from "@/hooks/use-mounted";
import { useThemeClass } from "@/hooks/use-theme-class";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useThemeClass();

  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4 z-50 p-2 rounded-full border border-border bg-background text-foreground shadow hover:bg-accent transition"
      aria-label="테마 전환"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};
