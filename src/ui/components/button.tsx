import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-500 shadow-sm shadow-brand-900/20",
  secondary: "bg-surface-elevated text-foreground hover:bg-surface-muted border border-border",
  ghost: "text-foreground/80 hover:bg-surface-muted hover:text-foreground",
  outline:
    "border border-brand-500/40 text-brand-700 hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-brand-950/40",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}