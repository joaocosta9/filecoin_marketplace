import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Plus, FileText } from "lucide-react";
import UploadModal from "@/components/UploadModal";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { address, isConnected } = useAccount();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

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
        {/* Profile Header */}
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

        {/* Uploaded Files Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Files</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Placeholder for uploaded files */}
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 text-center">
              <FileText className="mx-auto text-gray-600 mb-2" size={48} />
              <p className="text-gray-400">No files uploaded yet</p>
              <p className="text-sm text-gray-500 mt-2">
                Click "Upload File" to get started
              </p>
            </div>
          </div>
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
