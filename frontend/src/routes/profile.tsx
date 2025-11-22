import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Plus, DollarSign, ExternalLink } from "lucide-react";
import UploadModal from "@/components/UploadModal";
import { useUserFiles } from "@/hooks/useUserFiles";
import {
  getCategoryIcon,
  getCategoryColor,
  getCategoryBg,
} from "@/lib/category-icons";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { address, isConnected } = useAccount();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { data: files, isLoading } = useUserFiles();

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Please connect your wallet</h1>
          <p className="text-gray-400">
            You need to connect your wallet to view your profile
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                My Marketplace
              </h1>
              <p className="text-gray-400 font-mono text-sm">{address}</p>
            </div>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 font-medium"
            >
              <Plus size={20} />
              <span>Upload File</span>
            </button>
          </div>
        </div>

        {/* Files Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Files</h2>
            {files && files.length > 0 && (
              <span className="text-sm text-gray-400">
                {files.length} {files.length === 1 ? "file" : "files"}
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-400">Loading your files...</p>
            </div>
          ) : files && files.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {files.map((file, index) => {
                const Icon = getCategoryIcon(file.category);
                const gradient = getCategoryColor(file.category);
                const bgColor = getCategoryBg(file.category);
                const hasPrice = file.price && parseFloat(file.price) > 0;

                return (
                  <div
                    key={file.pieceCid + index}
                    className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-gray-600 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
                  >
                    {/* Category gradient header */}
                    <div
                      className={`h-32 bg-gradient-to-br ${gradient} opacity-80 relative overflow-hidden`}
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
                            <span className="text-sm font-bold text-white">
                              {file.price}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {file.title || "Untitled File"}
                      </h3>
                      {file.description && (
                        <p className="text-sm text-gray-400 mb-4 line-clamp-2 min-h-[2.5rem]">
                          {file.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
                        {file.category && (
                          <span
                            className={`px-3 py-1 rounded-lg text-xs font-medium ${bgColor} text-gray-300 border border-white/5`}
                          >
                            {file.category}
                          </span>
                        )}
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-700/50 rounded-lg">
                          <ExternalLink size={16} className="text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Hover overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-transparent transition-all pointer-events-none"></div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-700/50 mb-4">
                <Plus className="text-gray-500" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                No files uploaded yet
              </h3>
              <p className="text-gray-400 mb-6">
                Start building your marketplace by uploading your first file
              </p>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 font-medium"
              >
                <Plus size={20} />
                <span>Upload Your First File</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
}
