import { cn } from "@/lib/utils/cn";
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <label className="block space-y-1.5">
      {label ? (
        <span className="text-sm font-medium text-foreground/80">{label}</span>
      ) : null}
      <input
        id={inputId}
        className={cn(
          "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none ring-brand-500/30 placeholder:text-muted focus:border-brand-500 focus:ring-2",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/30",
          className,
        )}
        {...props}
      />
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}