import { useAccount } from "wagmi";
import { useReadFilePlaceSaleGetPurchasedItems } from "../../wagmi.generated";
import { useMemo } from "react";

export const usePurchasedItems = () => {
  const { address } = useAccount();

  const {
    data: purchasedContents,
    isLoading,
    error,
  } = useReadFilePlaceSaleGetPurchasedItems({
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 30000,
    },
  });

  const purchasedItems = useMemo(() => {
    if (!purchasedContents) return [];

    return purchasedContents.map((content) => ({
      creator: content.creator,
      contentId: content.uuid,
      price: content.price.toString(),
    }));
  }, [purchasedContents]);

  return {
    data: purchasedItems,
    isLoading,
    error,
  };
};
