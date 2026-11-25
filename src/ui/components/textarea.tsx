import { cn } from "@/lib/utils/cn";
import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export function Textarea({
  label,
  error,
  className,
  id,
  ...props
}: TextareaProps) {
  const textareaId = id ?? props.name;
  return (
    <label className="block space-y-1.5">
      {label ? (
        <span className="text-sm font-medium text-foreground/80">{label}</span>
      ) : null}
      <textarea
        id={textareaId}
        className={cn(
          "min-h-28 w-full resize-y rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none ring-brand-500/30 placeholder:text-muted focus:border-brand-500 focus:ring-2",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/30",
          className,
        )}
        {...props}
      />
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}