import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileCard } from "@/components/FileCard";
import { useMarketplaceFiles } from "@/hooks";
import { Loader2, Store, Search } from "lucide-react";

export const Route = createFileRoute("/")({
  component: MarketplacePage,
});

function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { files, sellers, isLoading } = useMarketplaceFiles(searchQuery);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Marketplace
              </h1>
              <p className="text-gray-400 mt-1">
                Browse and purchase files from creators
              </p>
            </div>
          </div>

          {sellers && sellers.length > 0 && (
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Search by Seller Address
              </label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter address to filter..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {searchQuery && (
                <p className="text-xs text-gray-500 mt-2">
                  Filtering by: {searchQuery}
                </p>
              )}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">All Available Files</h2>
            {files.length > 0 && (
              <span className="text-sm text-gray-400">
                {files.length} {files.length === 1 ? "file" : "files"}
                {sellers &&
                  ` from ${sellers.length} ${sellers.length === 1 ? "seller" : "sellers"}`}
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
              <p className="text-gray-400">Loading marketplace...</p>
            </div>
          ) : files.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {files.map((file, index) => (
                <FileCard
                  key={`${file.ownerAddress}-${file.pieceCid}-${index}`}
                  file={file}
                  dataset={file.dataset}
                  ownerAddress={file.ownerAddress}
                  showOwner={true}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-800/30 rounded-2xl border border-gray-700/50">
              <Store size={64} className="text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                {searchQuery ? "No Matching Files" : "No Files Available"}
              </h3>
              <p className="text-gray-500 text-center max-w-md">
                {searchQuery
                  ? "No files found matching your search. Try a different address."
                  : "No files are currently listed in the marketplace. Be the first to upload!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
