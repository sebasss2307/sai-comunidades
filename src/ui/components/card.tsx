import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}