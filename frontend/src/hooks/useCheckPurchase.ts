import { useAccount } from "wagmi";
import { useReadFilePlaceSalePurchases } from "../../wagmi.generated";

export const useCheckPurchase = (
  creatorAddress?: string,
  contentId?: string,
) => {
  const { address: buyerAddress } = useAccount();

  const { data: hasPurchased, isLoading } = useReadFilePlaceSalePurchases({
    args:
      buyerAddress && creatorAddress && contentId
        ? [buyerAddress, creatorAddress as `0x${string}`, contentId]
        : undefined,
    query: {
      enabled: !!(buyerAddress && creatorAddress && contentId),
      refetchInterval: 5000,
    },
  });

  return {
    hasPurchased: hasPurchased || false,
    isLoading,
  };
};
