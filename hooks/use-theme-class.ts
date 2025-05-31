"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export const useThemeClass = () => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as Theme | null;
      if (saved === "dark" || saved === "light") return saved;
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return systemPrefersDark ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const setTheme = (next: Theme) => {
    setThemeState(next);
  };

  return { theme, setTheme };
};
