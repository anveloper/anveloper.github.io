"use client";

import { type Theme, useThemeClass } from "@/hooks/use-theme-class";
import { cn } from "@/lib/utils";
import { Check, Moon, Palette, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const themeOptions: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "라이트", icon: Sun },
  { value: "dark", label: "다크", icon: Moon },
  { value: "korean", label: "묵향", icon: Palette },
];

const currentIcon = (theme: Theme) => {
  const option = themeOptions.find((o) => o.value === theme);
  return option?.icon ?? Sun;
};

export const ThemeSelector = () => {
  const { theme, setTheme } = useThemeClass();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const Icon = currentIcon(theme);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="테마 선택"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Icon className="w-4 h-4" />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="테마 목록"
          className={cn(
            "absolute right-0 top-full mt-2 z-50",
            "min-w-[140px] py-1",
            "bg-popover text-popover-foreground",
            "border border-border shadow-md rounded-md",
            "animate-in fade-in-0 zoom-in-95"
          )}
        >
          {themeOptions.map((option) => {
            const OptionIcon = option.icon;
            const isActive = theme === option.value;
            return (
              <button
                key={option.value}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  setTheme(option.value);
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive && "text-foreground font-medium"
                )}
              >
                <OptionIcon className="w-4 h-4" />
                <span className="flex-1 text-left">{option.label}</span>
                {isActive && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
