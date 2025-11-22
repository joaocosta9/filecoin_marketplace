import { z } from "zod";
import { CATEGORIES } from "@/constants/categories";

export const uploadFormSchema = z.object({
  file: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => file.size > 0, { message: "File cannot be empty" }),
  title: z
    .string()
    .min(1, "Title is required")
    .trim()
    .max(200, "Title must be less than 200 characters"),
  description: z
    .string()
    .trim()
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
  category: z.enum([...CATEGORIES] as [string, ...string[]], {
    message: "Invalid category",
  }),
  price: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val === "") return true;
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0;
      },
      { message: "Price must be a valid positive number" },
    ),
  isPrivate: z.boolean().default(false),
});

export type UploadFormValues = z.infer<typeof uploadFormSchema>;
