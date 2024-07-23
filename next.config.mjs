/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix:
    process.env.NODE_ENV === "production" ? "https://anveloper.github.io/" : "",
};

export default nextConfig;
