import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline" | "easy" | "medium" | "hard";
  size?: "sm" | "md";
}

export function Badge({ className, variant = "default", size = "sm", children, ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center font-mono font-medium rounded-full border transition-colors";

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 leading-none",
    md: "text-xs px-2.5 py-1 leading-tight",
  };

  const variantStyles = {
    default: "bg-surface-muted text-foreground-muted border-border",
    accent: "bg-accent/20 text-[#254A07] border-accent/40 dark:bg-accent/15 dark:text-accent",
    outline: "bg-transparent text-foreground-muted border-border",
    easy: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:text-emerald-400",
    medium: "bg-amber-500/10 text-amber-700 border-amber-500/30 dark:text-amber-400",
    hard: "bg-rose-500/10 text-rose-700 border-rose-500/30 dark:text-rose-400",
  };

  return (
    <span className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)} {...props}>
      {children}
    </span>
  );
}
