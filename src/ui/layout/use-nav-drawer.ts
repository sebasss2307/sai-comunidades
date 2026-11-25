"use client";

import { useCallback, useEffect, useId, useState } from "react";

import { useAppPathname } from "@/ui/layout/use-app-pathname";

export function useNavDrawer() {
  const [open, setOpen] = useState(false);
  const pathname = useAppPathname();
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((value) => !value), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return { open, close, toggle, panelId };
}