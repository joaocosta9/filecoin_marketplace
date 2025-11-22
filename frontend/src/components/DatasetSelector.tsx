import { ChevronDown, Plus, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useCreateDataSet, useProviders } from "@filoz/synapse-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";

interface DatasetSelectorProps {
  datasets: any[];
  selectedDatasetId: string;
  onSelectDataset: (id: string) => void;
  fileCount?: number;
  isLoading?: boolean;
}

export function DatasetSelector({
  datasets,
  selectedDatasetId,
  onSelectDataset,
  fileCount,
  isLoading,
}: DatasetSelectorProps) {
  const { address, chainId } = useAccount();
  const queryClient = useQueryClient();
  const { data: providers, isLoading: isLoadingProviders } = useProviders();
  const { mutate: createDataSet, isPending: isCreating } = useCreateDataSet({});

  const handleCreateDataset = () => {
    if (!providers || providers.length === 0) {
      alert("No providers available. Please try again later.");
      return;
    }

    // Select the first available provider
    const provider = providers[0];

    createDataSet(
      { provider, cdn: false },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["synapse-warm-storage-data-sets", address],
          });
          queryClient.invalidateQueries({
            queryKey: ["user-files", address, chainId],
          });
        },
        onError: (error) => {
          console.error("Failed to create dataset:", error);
          alert(`Failed to create dataset: ${error.message}`);
        },
      },
    );
  };

  const selectedDataset = datasets.find(
    (d) => d.dataSetId.toString() === selectedDatasetId,
  );

  const displayName =
    selectedDatasetId === "all"
      ? "All Datasets"
      : selectedDataset
        ? `Dataset #${selectedDataset.dataSetId}`
        : "Select Dataset";

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : displayName}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-gray-800 border-gray-700"
        >
          <DropdownMenuItem
            onClick={() => onSelectDataset("all")}
            className="text-white hover:bg-gray-700 cursor-pointer"
          >
            All Datasets
          </DropdownMenuItem>
          {datasets.map((dataset) => (
            <DropdownMenuItem
              key={dataset.dataSetId.toString()}
              onClick={() => onSelectDataset(dataset.dataSetId.toString())}
              className="text-white hover:bg-gray-700 cursor-pointer"
            >
              Dataset #{dataset.dataSetId}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        size="sm"
        variant="outline"
        className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 text-white"
        onClick={handleCreateDataset}
        disabled={
          isCreating ||
          isLoadingProviders ||
          !providers ||
          providers.length === 0
        }
      >
        {isCreating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="hidden sm:inline">Creating...</span>
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Dataset</span>
          </>
        )}
      </Button>

      {fileCount !== undefined && fileCount > 0 && (
        <span className="text-sm text-gray-400">
          {fileCount} {fileCount === 1 ? "file" : "files"}
        </span>
      )}
    </div>
  );
}
