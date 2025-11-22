import { DollarSign, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  getCategoryIcon,
  getCategoryColor,
  getCategoryBg,
} from "@/lib/category-icons";
import { type UserFile } from "@/hooks/useUserFiles";

interface FileCardProps {
  file: UserFile;
  onClick?: () => void;
}

export function FileCard({ file, onClick }: FileCardProps) {
  const Icon = getCategoryIcon(file.category);
  const gradient = getCategoryColor(file.category);
  const bgColor = getCategoryBg(file.category);
  const hasPrice = file.price && parseFloat(file.price) > 0;

  return (
    <Card
      onClick={onClick}
      className="group relative bg-gray-800 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 cursor-pointer p-0 gap-0 shadow-lg flex flex-col"
    >
      {/* Category gradient header */}
      <div
        className={`h-32 bg-gradient-to-br ${gradient} opacity-80 relative overflow-hidden flex-shrink-0`}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div
            className={`p-3 rounded-xl ${bgColor} backdrop-blur-sm border border-white/10`}
          >
            <Icon className="text-white" size={24} />
          </div>
          {hasPrice && (
            <div className="flex items-center space-x-1 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
              <DollarSign size={16} className="text-yellow-300" />
              <span className="text-sm font-bold text-white">{file.price}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg text-white font-bold mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {file.title || "Untitled File"}
        </h3>
        <div className="min-h-10 mb-4">
          {file.description ? (
            <p className="text-sm text-gray-400 line-clamp-2">
              {file.description}
            </p>
          ) : (
            <p className="text-sm text-transparent">.</p>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between pt-4 border-t border-gray-700/50 px-5 pb-5 mt-auto flex-shrink-0">
        {file.category && (
          <span
            className={`px-3 py-1 rounded-lg text-xs font-medium ${bgColor} text-gray-300 border border-white/5`}
          >
            {file.category}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-700/50 rounded-lg"
        >
          <ExternalLink size={16} className="text-gray-400" />
        </button>
      </CardFooter>

      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-transparent transition-all pointer-events-none"></div>
    </Card>
  );
}
