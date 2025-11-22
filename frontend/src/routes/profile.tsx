import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Plus } from "lucide-react";
import UploadModal from "@/components/UploadModal";
import { useUserFiles } from "@/hooks/useUserFiles";
import { FileCard } from "@/components/FileCard";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSpinner } from "@/components/LoadingSpinner";

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
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <Plus size={20} />
              <span>Upload File</span>
            </Button>
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
            <LoadingSpinner message="Loading your files..." />
          ) : files && files.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {files.map((file, index) => (
                <FileCard key={file.pieceCid + index} file={file} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No files uploaded yet"
              description="Start building your marketplace by uploading your first file"
              actionLabel="Upload Your First File"
              onAction={() => setIsUploadModalOpen(true)}
            />
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
