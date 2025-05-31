"use client";

import { useEffect } from "react";

const FaviconSwitcher = () => {
  useEffect(() => {
    const setFavicon = (theme: "light" | "dark") => {
      const faviconHref = theme === "dark" ? "/favicon-dark.svg" : "/favicon-light.svg";

      const rels = ["icon", "shortcut icon", "apple-touch-icon"];

      rels.forEach((rel) => {
        let link = document.querySelector(`link[rel='${rel}']`) as HTMLLinkElement | null;

        if (!link) {
          link = document.createElement("link");
          link.rel = rel;
          link.type = "image/svg+xml";
          document.head.appendChild(link);
        }

        link.href = faviconHref;
      });

      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    };

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setFavicon(media.matches ? "dark" : "light");

    const getPreferredTheme = (): "light" | "dark" => {
      const saved = localStorage.getItem("theme") as "light" | "dark" | null;
      return saved ?? (media.matches ? "dark" : "light");
    };

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
