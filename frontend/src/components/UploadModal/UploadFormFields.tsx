import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form-field";
import { FileUpload } from "@/components/ui/file-upload";
import { CATEGORIES } from "@/constants/categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UploadFormFieldsProps {
  form: any;
  isUploading: boolean;
  datasets: any[];
}

export function UploadFormFields({
  form,
  isUploading,
  datasets,
}: UploadFormFieldsProps) {
  return (
    <>
      {/* Dataset Selection */}
      {datasets.length > 0 && (
        <form.Field name="datasetId">
          {(field: any) => (
            <FormField
              label="Dataset"
              description="Choose an existing dataset or leave empty to create a new one"
            >
              <Select
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
                disabled={isUploading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Create New Dataset" />
                </SelectTrigger>
                <SelectContent>
                  {datasets.map((dataset) => (
                    <SelectItem
                      key={dataset.dataSetId.toString()}
                      value={dataset.dataSetId.toString()}
                    >
                      Dataset #{dataset.dataSetId}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          )}
        </form.Field>
      )}

      {/* File Upload */}
      <form.Field name="file">
        {(field: any) => (
          <FormField label="File" required error={field.state.meta.errors[0]}>
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
        {(field: any) => (
          <FormField label="Title" required error={field.state.meta.errors[0]}>
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
        {(field: any) => (
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
        {(field: any) => (
          <FormField label="Category">
            <Select
              value={field.state.value}
              onValueChange={(value) =>
                field.handleChange(value as (typeof CATEGORIES)[number])
              }
              disabled={isUploading}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        )}
      </form.Field>

      {/* Price */}
      <form.Field name="price">
        {(field: any) => (
          <FormField
            label="Price (FIL)"
            description="Set to 0 or leave empty for free files. Paid files will be encrypted."
          >
            <Input
              type="number"
              step="0.01"
              min="0"
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              disabled={isUploading}
              placeholder="0.00"
              aria-invalid={field.state.meta.errors.length > 0}
            />
          </FormField>
        )}
      </form.Field>
    </>
  );
}
