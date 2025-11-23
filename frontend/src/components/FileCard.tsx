import {
  DollarSign,
  Download,
  Loader2,
  Eye,
  Trash2,
  ShoppingCart,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCategory, useFileOperations, useBuy, type UserFile } from "@/hooks";
import { useAccount } from "wagmi";

interface FileCardProps {
  file: UserFile;
  dataset?: any;
  onClick?: () => void;
  ownerAddress?: string;
  showOwner?: boolean;
}

export function FileCard({
  file,
  dataset,
  onClick,
  ownerAddress,
  showOwner,
}: FileCardProps) {
  const { address: connectedAddress } = useAccount();
  const { icon: Icon, gradient, bgColor } = useCategory(file.category);
  const {
    download,
    view,
    delete: deleteFile,
  } = useFileOperations(file, dataset, ownerAddress);

  const buyMutation = useBuy(() => {
    // Transaction is already confirmed, download immediately
    download.mutate();
  });

  const hasPrice = file.price && parseFloat(file.price) > 0;
  const isOwner =
    connectedAddress &&
    ownerAddress &&
    connectedAddress.toLowerCase() === ownerAddress.toLowerCase();

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
        {showOwner && ownerAddress && (
          <p className="text-xs text-gray-500 mb-2 font-mono">
            by {ownerAddress.slice(0, 6)}...{ownerAddress.slice(-4)}
          </p>
        )}
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
        <div className="flex items-center gap-2 transition-opacity">
          {hasPrice && !isOwner ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!ownerAddress) {
                    alert("Owner address not available");
                    return;
                  }
                  if (!file.price) {
                    alert("Price not available");
                    return;
                  }
                  if (!file.contentId) {
                    alert(
                      "Content ID not available - file may not support purchases",
                    );
                    return;
                  }

                  buyMutation.mutate({
                    creatorAddress: ownerAddress,
                    cid: file.contentId,
                    price: file.price,
                  });
                }}
                disabled={buyMutation.isPending}
                className="p-2 hover:bg-green-600/50 rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                title={
                  buyMutation.isPending
                    ? "Processing purchase..."
                    : `Buy for ${file.price} FIL`
                }
              >
                {buyMutation.isPending ? (
                  <Loader2 size={16} className="text-green-400 animate-spin" />
                ) : (
                  <ShoppingCart size={16} className="text-green-400" />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  view.mutate();
                }}
                disabled={view.isPending || !view.isAvailable}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                title="View file (TESTING)"
              >
                {view.isPending ? (
                  <Loader2 size={16} className="text-gray-400 animate-spin" />
                ) : (
                  <Eye size={16} className="text-gray-400" />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  download.mutate();
                }}
                disabled={download.isPending}
                className="p-2 hover:bg-blue-600/50 rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                title="Download file (TESTING - will attempt decryption)"
              >
                {download.isPending ? (
                  <Loader2 size={16} className="text-blue-400 animate-spin" />
                ) : (
                  <Download size={16} className="text-blue-400" />
                )}
              </button>
            </>
          ) : (
            // Show view/download for free files or if owner
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  view.mutate();
                }}
                disabled={view.isPending || !view.isAvailable}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                title="View file"
              >
                {view.isPending ? (
                  <Loader2 size={16} className="text-gray-400 animate-spin" />
                ) : (
                  <Eye size={16} className="text-gray-400" />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  download.mutate();
                }}
                disabled={download.isPending}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                title="Download file"
              >
                {download.isPending ? (
                  <Loader2 size={16} className="text-gray-400 animate-spin" />
                ) : (
                  <Download size={16} className="text-gray-400" />
                )}
              </button>
            </>
          )}
          {isOwner && deleteFile.isAvailable && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm("Are you sure you want to delete this file?")) {
                  deleteFile.mutation.mutate({
                    dataSet: deleteFile.dataset!,
                    pieceId: deleteFile.pieceId!,
                  });
                }
              }}
              disabled={deleteFile.mutation.isPending}
              className="p-2 hover:bg-red-600/50 rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              title="Delete file"
            >
              {deleteFile.mutation.isPending ? (
                <Loader2 size={16} className="text-red-400 animate-spin" />
              ) : (
                <Trash2 size={16} className="text-red-400" />
              )}
            </button>
          )}
        </div>
      </CardFooter>

      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-transparent transition-all pointer-events-none"></div>
    </Card>
  );
}
