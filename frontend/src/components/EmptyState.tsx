import { Plus } from "lucide-react";
import { Button } from "./ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="p-12 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-700/50 mb-4">
        <Plus className="text-gray-500" size={32} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      {onAction && (
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700"
          onClick={onAction}
        >
          <Plus size={20} />
          <span>{actionLabel}</span>
        </Button>
      )}
    </div>
  );
}
