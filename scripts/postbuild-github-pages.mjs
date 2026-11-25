import { writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const outDir = path.join(process.cwd(), "out");

/** Evita que Jekyll ignore rutas con guion bajo en GitHub Pages. */
await writeFile(path.join(outDir, ".nojekyll"), "", "utf8");

await import(
  pathToFileURL(path.join(process.cwd(), "scripts/restore-github-pages.mjs")).href
);