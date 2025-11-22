import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TIME_CONSTANTS } from "@filoz/synapse-sdk";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { useSynapse } from "./useSynapse";

/**
 * Hook for funding account with USDFC using TanStack Mutation.
 * Deposits 2.5 USDFC and approves warm storage operator.
 */
export const useFund = () => {
  const { address } = useAccount();
  const { data: synapse } = useSynapse();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["fund", address],
    mutationFn: async () => {
      if (!synapse) throw new Error("Synapse not initialized");

      const depositAmount = ethers.parseUnits("2.5", 18);
      const tx = await synapse.payments.depositWithPermitAndApproveOperator(
        depositAmount,
        synapse.getWarmStorageAddress(),
        ethers.MaxUint256,
        ethers.MaxUint256,
        TIME_CONSTANTS.EPOCHS_PER_MONTH,
      );
      await tx.wait();

      return { success: true };
    },
    onSuccess: () => {
      // Invalidate synapse query to refresh any balance data
      queryClient.invalidateQueries({ queryKey: ["synapse", address] });
    },
  });
};
