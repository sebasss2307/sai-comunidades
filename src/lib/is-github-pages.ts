/** Build estático para GitHub Pages (export en CI o `npm run build:github-pages`). */
export function isGitHubPagesBuild(): boolean {
  return process.env.GITHUB_PAGES === "true";
}