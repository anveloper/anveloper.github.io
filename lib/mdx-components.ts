import type { MDXComponents } from "mdx/types";
import { createElement } from "react";
import { Mermaid } from "@/components/mermaid";

export const mdxComponents: MDXComponents = {
  Mermaid,
  h1: (props) =>
    createElement("h1", {
      ...props,
      className: "text-4xl font-bold mt-8 mb-4 text-foreground",
    }),
  h2: (props) =>
    createElement("h2", {
      ...props,
      className: "text-3xl font-semibold mt-6 mb-3 text-foreground border-b border-border pb-2",
    }),
  h3: (props) =>
    createElement("h3", {
      ...props,
      className: "text-2xl font-semibold mt-5 mb-2 text-foreground",
    }),
  h4: (props) =>
    createElement("h4", {
      ...props,
      className: "text-xl font-semibold mt-4 mb-2 text-foreground",
    }),
  p: (props) =>
    createElement("p", {
      ...props,
      className: "my-4 leading-7 text-foreground/90",
    }),
  a: (props) =>
    createElement("a", {
      ...props,
      className: "text-primary-sky underline underline-offset-4 hover:text-primary-sky/80 transition-colors",
      target: props.href?.startsWith("http") ? "_blank" : undefined,
      rel: props.href?.startsWith("http") ? "noopener noreferrer" : undefined,
    }),
  ul: (props) =>
    createElement("ul", {
      ...props,
      className: "my-4 ml-6 list-disc space-y-2",
    }),
  ol: (props) =>
    createElement("ol", {
      ...props,
      className: "my-4 ml-6 list-decimal space-y-2",
    }),
  li: (props) =>
    createElement("li", {
      ...props,
      className: "text-foreground/90 leading-7",
    }),
  blockquote: (props) =>
    createElement("blockquote", {
      ...props,
      className: "border-l-4 border-primary-sky pl-4 my-4 italic text-muted-foreground",
    }),
  figure: (props) => {
    const isCodeFigure = props["data-rehype-pretty-code-figure"] !== undefined;
    return createElement("figure", {
      ...props,
      className: isCodeFigure ? "not-prose my-4" : props.className,
    });
  },
  code: (props) => {
    const isHighlighted = !!props["data-theme"];
    if (isHighlighted) {
      return createElement("code", { ...props });
    }
    return createElement("code", {
      ...props,
      className: "bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground",
    });
  },
  pre: (props) => {
    const isHighlighted = !!props["data-theme"];
    if (isHighlighted) {
      return createElement("pre", {
        ...props,
        className: "p-4 rounded-lg overflow-x-auto my-0 font-mono text-sm",
      });
    }
    return createElement("pre", {
      ...props,
      className: "bg-muted p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm",
    });
  },
  hr: (props) =>
    createElement("hr", {
      ...props,
      className: "my-8 border-border",
    }),
  table: ({ children, ...props }) =>
    createElement(
      "div",
      { className: "my-6 overflow-x-auto" },
      createElement("table", { ...props, className: "w-full border-collapse" }, children)
    ),
  thead: (props) =>
    createElement("thead", {
      ...props,
      className: "bg-muted",
    }),
  th: (props) =>
    createElement("th", {
      ...props,
      className: "border border-border px-4 py-2 text-left font-semibold",
    }),
  td: (props) =>
    createElement("td", {
      ...props,
      className: "border border-border px-4 py-2",
    }),
  img: (props) =>
    createElement("img", {
      ...props,
      className: "rounded-lg my-4 max-w-full h-auto",
    }),
  strong: (props) =>
    createElement("strong", {
      ...props,
      className: "font-semibold text-foreground",
    }),
  em: (props) =>
    createElement("em", {
      ...props,
      className: "italic",
    }),
};
