import { useMemo } from "react";
import { useMarketplaceSellers } from "./useMarketplaceSellers";
import { useUserFiles } from "./useUserFiles";
import { useDataSets } from "@filoz/synapse-react";

export const useMarketplaceFiles = (searchQuery?: string) => {
  const { data: sellers, isLoading: isSellersLoading } =
    useMarketplaceSellers();

  const sellersData = (sellers || []).map((seller) => {
    const { data: files, isLoading: filesLoading } = useUserFiles(
      undefined,
      seller,
    );
    const { data: datasets, isLoading: datasetsLoading } = useDataSets({
      address: seller as any,
    });

    return {
      seller,
      files,
      datasets,
      isLoading: filesLoading || datasetsLoading,
    };
  });

  const { allFiles, isLoading } = useMemo(() => {
    const files = sellersData.flatMap((data) =>
      (data.files || []).map((file) => ({
        ...file,
        ownerAddress: data.seller,
        dataset: data.datasets?.find(
          (d) => d.dataSetId.toString() === file.dataSetId?.toString(),
        ),
      })),
    );

    const filteredFiles = searchQuery
      ? files.filter((file) =>
          file.ownerAddress.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : files;

    return {
      allFiles: filteredFiles,
      isLoading: sellersData.some((d) => d.isLoading) || isSellersLoading,
    };
  }, [sellersData, searchQuery, isSellersLoading]);

  return {
    files: allFiles,
    sellers,
    isLoading,
  };
};
