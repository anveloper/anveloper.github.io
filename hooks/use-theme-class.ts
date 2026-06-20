"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "korean" | "terminal";

const VALID_THEMES: Theme[] = ["light", "dark", "korean", "terminal"];
const THEME_CLASSES: Theme[] = ["light", "dark", "korean", "terminal"];

const isValidTheme = (value: string | null): value is Theme => VALID_THEMES.includes(value as Theme);

export const useThemeClass = () => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (isValidTheme(saved)) return saved;
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return systemPrefersDark ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    THEME_CLASSES.forEach((cls) => root.classList.remove(cls));
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const setTheme = (next: Theme) => {
    // 테마 전환 순간에만 색상 transition을 활성화 (평소 hover 반응성·초기 로드 플래시 방지)
    const root = document.documentElement;
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 350);
    setThemeState(next);
  };

  return { theme, setTheme };
};
