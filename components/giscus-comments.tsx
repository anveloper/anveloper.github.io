"use client";

import Giscus from "@giscus/react";
import { useSyncExternalStore } from "react";

const resolveGiscusTheme = (): "light" | "dark" => {
  const root = document.documentElement;
  if (root.classList.contains("dark") || root.classList.contains("terminal")) return "dark";
  return "light";
};

const subscribe = (callback: () => void) => {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
};

export const GiscusComments = () => {
  const theme = useSyncExternalStore(subscribe, resolveGiscusTheme, () => "light" as const);

  return (
    <section aria-label="댓글" className="mt-12 pt-8 border-t border-border">
      <Giscus
        repo="anveloper/anveloper.github.io"
        repoId="R_kgDOHCTsEQ"
        category="Comments"
        categoryId="DIC_kwDOHCTsEc4Cerfo"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme}
        lang="ko"
      />
    </section>
  );
};
