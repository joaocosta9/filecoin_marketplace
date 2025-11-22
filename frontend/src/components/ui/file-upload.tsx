import * as React from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  disabled?: boolean;
  accept?: string;
  className?: string;
}

export function FileUpload({
  file,
  onFileSelect,
  disabled,
  accept,
  className,
}: FileUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
        file
          ? "border-primary bg-primary/10"
          : "border-muted-foreground/25 hover:border-muted-foreground/50",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        disabled={disabled}
        accept={accept}
        className="hidden"
      />
      {file ? (
        <div className="space-y-2">
          <Upload className="mx-auto text-primary" size={32} />
          <p className="font-medium text-foreground">{file.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatFileSize(file.size)}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <Upload className="mx-auto text-muted-foreground" size={32} />
          <p className="text-muted-foreground">
            Click to select or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">
            Supported: Any file type
          </p>
        </div>
      )}
    </div>
  );
}
