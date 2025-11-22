import { Loader2 } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useFileUpload, type FileUploadMetadata } from "@/hooks/useFileUpload";
import { CATEGORIES } from "@/constants/categories";
import { uploadFormSchema } from "@/lib/validations/upload";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/components/ui/form-field";
import { FileUpload } from "@/components/ui/file-upload";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const { uploadFileMutation, progress, status, handleReset } = useFileUpload();

  const form = useForm({
    defaultValues: {
      file: null as File | null,
      title: "",
      description: "",
      category: CATEGORIES[0] as (typeof CATEGORIES)[number],
      price: "",
      isPrivate: false,
    },
    validators: {
      onChange: ({ value }) => {
        const result = uploadFormSchema.safeParse(value);
        if (!result.success) {
          return result.error.issues.map((err) => err.message).join(", ");
        }
      },
    },
    onSubmit: async ({ value }) => {
      const result = uploadFormSchema.safeParse(value);
      if (!result.success) {
        return;
      }

      const metadata: FileUploadMetadata = {
        title: result.data.title.trim(),
        description: result.data.description?.trim() || "",
        category: result.data.category as (typeof CATEGORIES)[number],
        price: result.data.price ? parseFloat(result.data.price) : undefined,
        isPrivate: result.data.isPrivate,
      };

      try {
        await uploadFileMutation.mutateAsync({
          file: result.data.file,
          metadata,
        });

        setTimeout(() => {
          handleClose();
        }, 2000);
      } catch (error) {
        console.error("Upload error:", error);
      }
    },
  });

  const handleClose = () => {
    if (uploadFileMutation.isPending) return;
    handleReset();
    form.reset();
    uploadFileMutation.reset();
    onClose();
  };

  const isUploading = uploadFileMutation.isPending;
  const isSuccess = progress === 100;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="shrink-0 px-6 pt-6 pb-4">
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Upload a file to Filecoin with metadata and optional pricing.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 min-h-0 overflow-y-auto px-6 space-y-6 pb-4">
            {/* File Upload */}
            <form.Field name="file">
              {(field) => (
                <FormField
                  label="File"
                  required
                  error={field.state.meta.errors[0]}
                >
                  <FileUpload
                    file={field.state.value}
                    onFileSelect={(file) => {
                      field.handleChange(file);

                      const titleValue = form.getFieldValue("title");
                      if (!titleValue) {
                        form.setFieldValue(
                          "title",
                          file.name.replace(/\.[^/.]+$/, ""),
                        );
                      }
                    }}
                    disabled={isUploading}
                  />
                </FormField>
              )}
            </form.Field>

            {/* Title */}
            <form.Field name="title">
              {(field) => (
                <FormField
                  label="Title"
                  required
                  error={field.state.meta.errors[0]}
                >
                  <Input
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    disabled={isUploading}
                    placeholder="Enter file title"
                    aria-invalid={field.state.meta.errors.length > 0}
                  />
                </FormField>
              )}
            </form.Field>

            {/* Description */}
            <form.Field name="description">
              {(field) => (
                <FormField label="Description">
                  <Textarea
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    disabled={isUploading}
                    rows={4}
                    placeholder="Describe your file..."
                    error={field.state.meta.errors.length > 0}
                  />
                </FormField>
              )}
            </form.Field>

            {/* Category */}
            <form.Field name="category">
              {(field) => (
                <FormField label="Category">
                  <Select
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(
                        e.target.value as (typeof CATEGORIES)[number],
                      )
                    }
                    onBlur={field.handleBlur}
                    disabled={isUploading}
                    error={field.state.meta.errors.length > 0}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Select>
                </FormField>
              )}
            </form.Field>

            {/* Price */}
            <form.Subscribe selector={(state) => state.values.isPrivate}>
              {(isPrivate) => (
                <form.Field name="price">
                  {(field) => (
                    <FormField label="Price (FIL)" description="Optional">
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        disabled={isUploading || isPrivate}
                        placeholder="0.00"
                        aria-invalid={field.state.meta.errors.length > 0}
                      />
                    </FormField>
                  )}
                </form.Field>
              )}
            </form.Subscribe>

            {/* Private Toggle */}
            <form.Field name="isPrivate">
              {(field) => (
                <FormField>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="private"
                      checked={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.checked);
                        if (e.target.checked) {
                          form.setFieldValue("price", "");
                        }
                      }}
                      onBlur={field.handleBlur}
                      disabled={isUploading}
                      error={field.state.meta.errors.length > 0}
                    />
                    <label
                      htmlFor="private"
                      className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Keep private (only visible to you)
                    </label>
                  </div>
                </FormField>
              )}
            </form.Field>

            {/* Progress */}
            {isUploading && (
              <div className="space-y-2 shrink-0">
                <div className="flex items-center justify-between text-sm gap-2 min-w-0">
                  <span className="text-muted-foreground truncate flex-1 min-w-0">
                    {status}
                  </span>
                  <span className="text-muted-foreground shrink-0">
                    {progress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Success Message */}
            {isSuccess && (
              <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg shrink-0">
                <p className="text-green-400 font-medium text-sm wrap-break-word overflow-wrap-anywhere">
                  {status}
                </p>
              </div>
            )}

            {/* Error Message */}
            {uploadFileMutation.isError && (
              <div className="p-4 bg-destructive/20 border border-destructive rounded-lg shrink-0">
                <p className="text-destructive text-sm wrap-break-word overflow-wrap-anywhere">
                  {uploadFileMutation.error?.message || "Upload failed"}
                </p>
              </div>
            )}
          </div>
          <DialogFooter className="shrink-0 px-6 pb-6 pt-4 border-t gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <form.Subscribe
              selector={(state) => ({
                hasFile: !!state.values.file,
                hasTitle: !!state.values.title?.trim(),
                isSubmitting: state.isSubmitting,
              })}
            >
              {({ hasFile, hasTitle, isSubmitting }) => (
                <Button
                  type="submit"
                  disabled={
                    !hasFile || !hasTitle || isSubmitting || isUploading
                  }
                >
                  {isUploading || isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <span>Upload</span>
                  )}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
