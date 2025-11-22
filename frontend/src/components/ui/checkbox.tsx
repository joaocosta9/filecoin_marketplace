import * as React from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends React.ComponentProps<"input"> {
  error?: boolean;
}

export function Checkbox({ className, error, ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border border-input shadow-xs transition-[box-shadow]",
        "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error &&
          "border-destructive ring-destructive/20 dark:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}
