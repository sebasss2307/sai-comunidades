import { cp, rename, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const actionsDir = path.join(root, "src/app/actions");
const actionsBackup = path.join(root, ".github-pages-backup/actions");
const middleware = path.join(root, "src/middleware.ts");
const middlewareBackup = path.join(
  root,
  ".github-pages-backup/middleware.ts",
);

try {
  await rm(actionsDir, { recursive: true, force: true });
} catch {
  // noop
}

try {
  await rename(actionsBackup, actionsDir);
} catch {
  // No había backup (build normal).
}

try {
  await rename(middlewareBackup, middleware);
} catch {
  // noop
}

await rm(path.join(root, ".github-pages-backup"), {
  recursive: true,
  force: true,
});