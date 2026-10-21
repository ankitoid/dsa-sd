import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "subtle" | "dark";
  interactive?: boolean;
}

export function Card({
  className,
  variant = "default",
  interactive = false,
  children,
  ...props
}: CardProps) {
  const baseStyles = "rounded-xl border transition-all duration-200";

  const variantStyles = {
    default: "bg-surface border-border shadow-subtle",
    elevated: "bg-surface border-border shadow-card hover:shadow-elevated",
    subtle: "bg-surface-muted/60 border-border/80",
    dark: "bg-dark-surface border-dark-border text-foreground dark",
  };

  const interactiveStyles = interactive
    ? "cursor-pointer hover:-translate-y-0.5 hover:border-foreground-muted/40 active:translate-y-0"
    : "";

  return (
    <div className={cn(baseStyles, variantStyles[variant], interactiveStyles, className)} {...props}>
      {children}
    </div>
  );
}
