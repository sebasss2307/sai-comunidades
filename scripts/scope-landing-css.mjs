import fs from "node:fs";
import path from "node:path";

const file = path.join(
  path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1")),
  "../src/ui/landing/landing-static.css",
);

let css = fs.readFileSync(file, "utf8");
css = css.replace(
  /body\{margin:0;background:var\(--cream\);color:var\(--ink\);font-family:[^}]+\}/,
  ".sai-landing{background:var(--cream);color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,sans-serif;line-height:1.6}",
);
fs.writeFileSync(file, css);
console.log("scoped");