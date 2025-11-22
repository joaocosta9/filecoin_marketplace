import * as React from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
  description?: string;
}

export function FormField({
  label,
  required,
  error,
  children,
  className,
  description,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
