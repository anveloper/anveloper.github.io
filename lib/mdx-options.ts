import remarkGfm from "remark-gfm";
import remarkMermaid from "./plugins/remark-mermaid";

export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMermaid],
  },
};
