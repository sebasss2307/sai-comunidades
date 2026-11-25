"use client";

import { usePathname } from "next/navigation";

/** Ruta sin prefijo de GitHub Pages (`NEXT_PUBLIC_BASE_PATH`). */
export function useAppPathname(): string {
  const pathname = usePathname();
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (base && pathname.startsWith(base)) {
    const stripped = pathname.slice(base.length);
    return stripped.startsWith("/") ? stripped : `/${stripped}`;
  }
  return pathname;
}