"use client";

import { useEffect } from "react";

const FaviconSwitcher = () => {
  useEffect(() => {
    const setFavicon = (theme: "light" | "dark") => {
      let link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;

      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }

      link.href = theme === "dark" ? "/favicon-dark.svg" : "/favicon-light.svg";

      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    };

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setFavicon(media.matches ? "dark" : "light");

    const getPreferredTheme = (): "light" | "dark" => {
      const saved = localStorage.getItem("theme") as "light" | "dark" | null;
      return saved ?? (media.matches ? "dark" : "light");
    };

    // 초기 적용
    setFavicon(getPreferredTheme());

    const handler = () => {
      const saved = localStorage.getItem("theme");
      if (!saved) {
        setFavicon(media.matches ? "dark" : "light");
      }
    };

    media.addEventListener("change", handler);

    return () => {
      media.removeEventListener("change", handler);
    };
  }, []);

  return null;
};

export default FaviconSwitcher;
