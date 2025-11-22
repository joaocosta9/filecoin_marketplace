import { useMemo } from "react";
import { FileText, Video, Code, Database, Palette, File } from "lucide-react";
import { type Category } from "@/constants/categories";

interface CategoryMetadata {
  icon: typeof FileText;
  gradient: string;
  bgColor: string;
}

const categoryMetadataMap: Record<Category, CategoryMetadata> = {
  Documents: {
    icon: FileText,
    gradient: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
  },
  Media: {
    icon: Video,
    gradient: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/10",
  },
  "Code/Scripts": {
    icon: Code,
    gradient: "from-green-500 to-green-600",
    bgColor: "bg-green-500/10",
  },
  "Data/Analytics": {
    icon: Database,
    gradient: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-500/10",
  },
  "Art/Design": {
    icon: Palette,
    gradient: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-500/10",
  },
  Other: {
    icon: File,
    gradient: "from-gray-500 to-gray-600",
    bgColor: "bg-gray-500/10",
  },
};

const defaultMetadata: CategoryMetadata = {
  icon: File,
  gradient: "from-gray-500 to-gray-600",
  bgColor: "bg-gray-500/10",
};

export const useCategory = (category?: string) => {
  return useMemo(() => {
    if (!category) return defaultMetadata;
    return categoryMetadataMap[category as Category] || defaultMetadata;
  }, [category]);
};
