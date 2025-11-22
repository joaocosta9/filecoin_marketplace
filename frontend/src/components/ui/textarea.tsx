import * as React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  error?: boolean;
}

export function Textarea({ className, error, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        error &&
          "border-destructive ring-destructive/20 dark:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}
