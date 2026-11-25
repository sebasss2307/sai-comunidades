import fs from "node:fs";
import path from "node:path";

const htmlPath = process.argv[2] ?? "C:/Users/sebas/Downloads/index.html";
const root = path.resolve(import.meta.dirname, "..");

const html = fs.readFileSync(htmlPath, "utf8");
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) throw new Error("No style block");
const style = styleMatch[1];

const bodyStart = html.indexOf("<body>");
const bodyEnd = html.indexOf("</body>");
let body = html.slice(bodyStart + 6, bodyEnd);
body = body.replace(/<img src="data:image[^"]+"/g, '<img src="/landing/logo.png"');
body = body.replace(/src="assets\//g, 'src="/landing/');

fs.mkdirSync(path.join(root, "src/ui/landing"), { recursive: true });
fs.mkdirSync(path.join(root, "public/landing"), { recursive: true });

fs.writeFileSync(path.join(root, "src/ui/landing/landing-static.css"), style);
fs.writeFileSync(path.join(root, "tmp-body-snippet.html"), body);

const logoMatch = html.match(/<img src="(data:image\/png;base64,[^"]+)"/);
if (logoMatch) {
  fs.writeFileSync(
    path.join(root, "public/landing/logo.png"),
    Buffer.from(logoMatch[1].split(",")[1], "base64"),
  );
}

const assetsDir = path.join(path.dirname(htmlPath), "assets");
if (fs.existsSync(assetsDir)) {
  for (const file of fs.readdirSync(assetsDir)) {
    fs.copyFileSync(
      path.join(assetsDir, file),
      path.join(root, "public/landing", file),
    );
  }
}

console.log("CSS bytes:", style.length);
console.log("Body bytes:", body.length);
console.log("Logo:", Boolean(logoMatch));