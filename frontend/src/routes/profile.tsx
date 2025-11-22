import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Plus, FileText, DollarSign } from "lucide-react";
import UploadModal from "@/components/UploadModal";
import { useUserFiles } from "@/hooks/useUserFiles";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { address, isConnected } = useAccount();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { data: files, isLoading } = useUserFiles();

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
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
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Your Profile</h1>
              <p className="text-gray-400 font-mono text-sm">{address}</p>
            </div>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Plus size={20} />
              <span>Upload File</span>
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Your Files</h2>
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading your files...</p>
            </div>
          ) : files && files.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {files.map((file, index) => (
                <div
                  key={file.pieceCid + index}
                  className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <FileText className="text-blue-500" size={24} />
                    {file.price && parseFloat(file.price) > 0 && (
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <DollarSign size={16} />
                        <span className="text-sm font-semibold">
                          {file.price}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    {file.title || "Untitled File"}
                  </h3>
                  {file.description && (
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                      {file.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-4 pt-4 border-t border-gray-700">
                    {file.category && (
                      <span className="px-2 py-1 bg-gray-700 rounded text-gray-300">
                        {file.category}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 text-center">
              <FileText className="mx-auto text-gray-600 mb-2" size={48} />
              <p className="text-gray-400">No files uploaded yet</p>
              <p className="text-sm text-gray-500 mt-2">
                Click "Upload File" to get started
              </p>
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
