import {
  FileText,
  Video,
  Code,
  Database,
  Palette,
  File,
  Image as ImageIcon,
} from "lucide-react";
import { type Category } from "@/constants/categories";

const categoryIconMap: Record<Category, typeof FileText> = {
  Documents: FileText,
  Media: Video,
  "Code/Scripts": Code,
  "Data/Analytics": Database,
  "Art/Design": Palette,
  Other: File,
};

const categoryColorMap: Record<Category, string> = {
  Documents: "from-blue-500 to-blue-600",
  Media: "from-purple-500 to-purple-600",
  "Code/Scripts": "from-green-500 to-green-600",
  "Data/Analytics": "from-orange-500 to-orange-600",
  "Art/Design": "from-pink-500 to-pink-600",
  Other: "from-gray-500 to-gray-600",
};

const categoryBgMap: Record<Category, string> = {
  Documents: "bg-blue-500/10",
  Media: "bg-purple-500/10",
  "Code/Scripts": "bg-green-500/10",
  "Data/Analytics": "bg-orange-500/10",
  "Art/Design": "bg-pink-500/10",
  Other: "bg-gray-500/10",
};

export const getCategoryIcon = (category?: string) => {
  if (!category) return File;
  return categoryIconMap[category as Category] || File;
};

export const getCategoryColor = (category?: string) => {
  if (!category) return "from-gray-500 to-gray-600";
  return categoryColorMap[category as Category] || "from-gray-500 to-gray-600";
};

export const getCategoryBg = (category?: string) => {
  if (!category) return "bg-gray-500/10";
  return categoryBgMap[category as Category] || "bg-gray-500/10";
};
