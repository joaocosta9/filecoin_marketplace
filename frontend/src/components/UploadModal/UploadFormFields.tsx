import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/components/ui/form-field";
import { FileUpload } from "@/components/ui/file-upload";
import { CATEGORIES } from "@/constants/categories";

interface UploadFormFieldsProps {
  form: any;
  isUploading: boolean;
}

export function UploadFormFields({ form, isUploading }: UploadFormFieldsProps) {
  return (
    <>
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
            <select
              value={field.state.value}
              onChange={(e) =>
                field.handleChange(
                  e.target.value as (typeof CATEGORIES)[number],
                )
              }
              onBlur={field.handleBlur}
              disabled={isUploading}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </FormField>
        )}
      </form.Field>

      {/* Price */}
      <form.Subscribe selector={(state: any) => state.values.isPrivate}>
        {(isPrivate: any) => (
          <form.Field name="price">
            {(field: any) => (
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
        {(field: any) => (
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
    </>
  );
}
