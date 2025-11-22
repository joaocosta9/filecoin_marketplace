import { useDeletePiece as useDeletePieceBase } from "@filoz/synapse-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export const useDeletePiece = () => {
  const { address, chainId } = useAccount();
  const queryClient = useQueryClient();

  return useDeletePieceBase({
    mutation: {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["user-files", address, chainId],
        });
      },
      onError: (error) => {
        alert(error.message);
      },
    },
  });
};
