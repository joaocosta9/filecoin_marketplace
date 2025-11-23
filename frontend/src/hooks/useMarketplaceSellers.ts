import { useMemo } from "react";
import { useReadFilePlaceSaleGetAllContents } from "../../wagmi.generated";

export const useMarketplaceSellers = () => {
  const { data: allContents, isLoading } = useReadFilePlaceSaleGetAllContents({
    query: {
      refetchInterval: 60000,
    },
  });

  const uniqueSellers = useMemo(() => {
    if (!allContents) return [];
    return [...new Set(allContents.map((content) => content.creator))];
  }, [allContents]);

  return {
    data: uniqueSellers,
    isLoading,
  };
};
