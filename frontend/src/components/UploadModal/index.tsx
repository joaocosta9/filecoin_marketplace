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
import { UploadFormFields } from "./UploadFormFields";
import { UploadProgress } from "./UploadProgress";
import { useDataSets } from "@filoz/synapse-react";
import { useAccount } from "wagmi";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDatasetId?: string;
}

export default function UploadModal({
  isOpen,
  onClose,
  selectedDatasetId,
}: UploadModalProps) {
  const { address } = useAccount();
  const { data: datasets } = useDataSets({ address });
  const { uploadFileMutation, progress, status, handleReset } = useFileUpload();

  const form = useForm({
    defaultValues: {
      file: null as File | null,
      title: "",
      description: "",
      category: CATEGORIES[0] as (typeof CATEGORIES)[number],
      price: "",
      isPrivate: false,
      datasetId:
        selectedDatasetId && selectedDatasetId !== "all"
          ? selectedDatasetId
          : "",
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

      const datasetIdNum = result.data.datasetId
        ? parseInt(result.data.datasetId)
        : undefined;

      try {
        await uploadFileMutation.mutateAsync({
          file: result.data.file,
          metadata,
          datasetId: datasetIdNum,
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
            <UploadFormFields
              form={form}
              isUploading={isUploading}
              datasets={datasets || []}
            />

            {/* Progress */}
            {isUploading && (
              <UploadProgress status={status} progress={progress} />
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
