import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount, usePublicClient } from "wagmi";
import { useWriteFilePlaceSaleBuy } from "../../wagmi.generated";
import { parseUnits } from "viem";

export const useBuy = (onPurchaseComplete?: () => void) => {
  const { address, chainId } = useAccount();
  const queryClient = useQueryClient();
  const { writeContractAsync } = useWriteFilePlaceSaleBuy();
  const publicClient = usePublicClient();

  const mutation = useMutation({
    mutationKey: ["buy", address, chainId],
    mutationFn: async ({
      creatorAddress,
      cid,
      price,
    }: {
      creatorAddress: string;
      cid: string;
      price: string;
    }) => {
      if (!address) throw new Error("Wallet not connected");
      if (!publicClient) throw new Error("Public client not available");

      const priceInWei = parseUnits(price, 18);
      const hash = await writeContractAsync({
        args: [creatorAddress as `0x${string}`, cid],
        value: priceInWei,
      });

      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
        confirmations: 2,
      });

      return { hash, receipt, creatorAddress, cid };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-files", address, chainId],
      });

      queryClient.invalidateQueries({
        predicate: (query) => {
          return (
            query.queryKey[0] === "readContract" &&
            JSON.stringify(query.queryKey).includes("getPurchasedItems")
          );
        },
      });

      alert("Purchase confirmed! Downloading your file...");

      if (onPurchaseComplete) {
        onPurchaseComplete();
      }
    },
    onError: (error: Error) => {
      alert(`Purchase failed: ${error.message}`);
    },
  });

  return mutation;
};
