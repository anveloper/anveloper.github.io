"use client";

import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

export const GiscusComments = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;
    setTheme(root.classList.contains("dark") ? "dark" : "light");

    const observer = new MutationObserver(() => {
      setTheme(root.classList.contains("dark") ? "dark" : "light");
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="mt-12 pt-8 border-t border-border">
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
