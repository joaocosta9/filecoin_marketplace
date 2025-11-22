import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileCard } from "@/components/FileCard";
import { useUserFiles } from "@/hooks";
import { Loader2, Store } from "lucide-react";
import { useDataSets } from "@filoz/synapse-react";

export const Route = createFileRoute("/marketplace")({
  component: MarketplacePage,
});

// List of seller addresses to browse
const SELLERS = [
  "0x395b67a9332f29e6551b461c9812086c94321c9c",
  // Add more seller addresses here as needed
];

function MarketplacePage() {
  const [selectedSeller, setSelectedSeller] = useState<string>(SELLERS[0]);

  const { data: files, isLoading } = useUserFiles(undefined, selectedSeller);
  const { data: datasets } = useDataSets({ address: selectedSeller as any });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-600/20 rounded-xl border border-blue-500/30">
              <Store size={32} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Marketplace
              </h1>
              <p className="text-gray-400 mt-1">
                Browse and purchase files from creators
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Browse Seller
            </label>
            <select
              value={selectedSeller}
              onChange={(e) => setSelectedSeller(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SELLERS.map((seller) => (
                <option key={seller} value={seller}>
                  {seller}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-2">
              Viewing files from: {selectedSeller.slice(0, 6)}...
              {selectedSeller.slice(-4)}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Available Files</h2>
            {files && files.length > 0 && (
              <span className="text-sm text-gray-400">
                {files.length} {files.length === 1 ? "file" : "files"}
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
              <p className="text-gray-400">Loading files...</p>
            </div>
          ) : files && files.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {files.map((file, index) => {
                const dataset = datasets?.find(
                  (d) => d.dataSetId.toString() === file.dataSetId?.toString(),
                );
                return (
                  <FileCard
                    key={file.pieceCid + index}
                    file={file}
                    dataset={dataset}
                    ownerAddress={selectedSeller}
                    showOwner={true}
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-800/30 rounded-2xl border border-gray-700/50">
              <Store size={64} className="text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No Files Available
              </h3>
              <p className="text-gray-500 text-center max-w-md">
                This seller hasn't uploaded any files yet. Check back later or
                browse other sellers.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
