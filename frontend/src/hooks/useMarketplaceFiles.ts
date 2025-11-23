import { useMemo } from "react";
import { useMarketplaceSellers } from "./useMarketplaceSellers";
import { useMultipleUserDataSets } from "./useMultipleUserDataSets";

export const useMarketplaceFiles = (searchQuery?: string) => {
  const { data: sellers, isLoading: isSellersLoading } =
    useMarketplaceSellers();

  const { data: allFiles, isLoading: isFilesLoading } = useMultipleUserDataSets(
    (sellers || []) as `0x${string}`[],
  );

  const filteredFiles = useMemo(() => {
    if (!allFiles) return [];
    if (!searchQuery) return allFiles;

    return allFiles.filter((file: any) =>
      file.ownerAddress?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [allFiles, searchQuery]);

  return {
    files: filteredFiles,
    sellers: sellers || [],
    isLoading: isSellersLoading || isFilesLoading,
  };
};
