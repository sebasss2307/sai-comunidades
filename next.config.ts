import type { NextConfig } from "next";

/**
 * GitHub Pages (sitio de proyecto): https://<usuario>.github.io/<repositorio>/
 * Activa con GITHUB_PAGES=true (ver workflow y npm run build:github-pages).
 */
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const repositoryBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split("/")[1] ?? ""}`
    : "/sai-comunidades");

const basePath = isGitHubPages ? repositoryBasePath : "";

const nextConfig: NextConfig = {
  cacheComponents: false,
  partialPrefetching: false,
  env: isGitHubPages
    ? {
        NEXT_PUBLIC_BASE_PATH: basePath,
        NEXT_PUBLIC_SHOW_DEMO_UI: "true",
      }
    : undefined,
  ...(isGitHubPages
    ? {
        output: "export",
        basePath,
        assetPrefix: basePath ? `${basePath}/` : undefined,
        trailingSlash: true,
      }
    : {}),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    ...(isGitHubPages ? { unoptimized: true } : {}),
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;