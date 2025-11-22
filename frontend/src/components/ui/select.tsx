import * as React from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.ComponentProps<"select"> {
  error?: boolean;
}

export function Select({ className, error, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error &&
          "border-destructive ring-destructive/20 dark:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}
