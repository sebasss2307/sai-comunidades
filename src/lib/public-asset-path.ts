/** Ruta pública con prefijo de GitHub Pages (`NEXT_PUBLIC_BASE_PATH`). */
export function publicAssetPath(assetPath: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const path = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return `${base}${path}`;
}