import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {},
  },
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  plugins: [require("tailwindcss-animate")],
};

export default config;
