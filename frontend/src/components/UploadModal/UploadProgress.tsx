interface UploadProgressProps {
  status: string;
  progress: number;
}

export function UploadProgress({ status, progress }: UploadProgressProps) {
  return (
    <div className="space-y-2 shrink-0">
      <div className="flex items-center justify-between text-sm gap-2 min-w-0">
        <span className="text-muted-foreground truncate flex-1 min-w-0">
          {status}
        </span>
        <span className="text-muted-foreground shrink-0">{progress}%</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

