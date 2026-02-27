"use client";

import { type Theme, useThemeClass } from "@/hooks/use-theme-class";
import { cn } from "@/lib/utils";
import { Check, Moon, Palette, Sun, SquareTerminal } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

type ThemeOption = {
  value: Theme;
  label: string;
  icon: typeof Sun;
  className: string;
  style?: React.CSSProperties;
};

const themeOptions: ThemeOption[] = [
  {
    value: "light",
    label: "라이트",
    icon: Sun,
    className: "bg-[#f5f5f7] text-[#1a1a2e] hover:bg-[#eaeaee]",
  },
  {
    value: "dark",
    label: "다크",
    icon: Moon,
    className: "bg-[#1e1e2e] text-[#e0e0f0] hover:bg-[#2a2a3e]",
  },
  {
    value: "korean",
    label: "묵향",
    icon: Palette,
    className: "bg-[#e8dcc8] text-[#3d2b1f] hover:bg-[#d4c4a8]",
    style: { fontFamily: '"East Sea Dokdo", cursive' },
  },
  {
    value: "terminal",
    label: "터미널",
    icon: SquareTerminal,
    className: "bg-[#0d0d0d] text-[#00ff41] hover:bg-[#1a1a1a]",
    style: {
      fontFamily: '"D2Coding Ligature", monospace',
      textShadow: "0 0 5px rgba(0,255,65,0.4)",
    },
  },
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
            "p-1 space-y-0.5",
            "bg-popover/80 backdrop-blur-sm",
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
                  "w-full flex items-center gap-1.5 px-2 py-1 text-xs rounded whitespace-nowrap",
                  "transition-all duration-200",
                  option.className,
                  isActive && "ring-1.5 ring-current/50 font-medium"
                )}
                style={option.style}
              >
                <OptionIcon className="w-3.5 h-3.5" />
                <span className="flex-1 text-left">{option.label}</span>
                {isActive && <Check className="w-3 h-3" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
