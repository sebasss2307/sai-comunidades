import { cp, mkdir, rename, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const backupRoot = path.join(root, ".github-pages-backup");
const actionsDir = path.join(root, "src/app/actions");
const actionsBackup = path.join(backupRoot, "actions");
const stubsDir = path.join(root, "src/github-pages/stubs");
const middleware = path.join(root, "src/middleware.ts");
const middlewareBackup = path.join(backupRoot, "middleware.ts");

if (process.env.GITHUB_PAGES !== "true") {
  console.log("prepare-github-pages: GITHUB_PAGES no activo, sin cambios.");
  process.exit(0);
}

await rm(backupRoot, { recursive: true, force: true });
await mkdir(backupRoot, { recursive: true });

await rename(actionsDir, actionsBackup);
await mkdir(actionsDir, { recursive: true });

const stubFiles = [
  "auth.ts",
  "contact.ts",
  "forum.ts",
  "profile.ts",
  "admin-carousel.ts",
  "admin-forum.ts",
  "admin-users.ts",
  "admin-contact.ts",
];

for (const file of stubFiles) {
  await cp(path.join(stubsDir, file), path.join(actionsDir, file));
}

try {
  await rename(middleware, middlewareBackup);
} catch {
  // Sin middleware.
}

console.log(
  "prepare-github-pages: acciones servidor respaldadas y middleware deshabilitado.",
);