import { useQuery } from "@tanstack/react-query";
import { Synapse, RPC_URLS } from "@filoz/synapse-sdk";
import { useAccount } from "wagmi";
import { useEthersSigner } from "./useEthers";

export const useSynapse = () => {
  const { isConnected, address } = useAccount();
  const signer = useEthersSigner();

  return useQuery({
    enabled: !!isConnected && !!address && !!signer,
    queryKey: ["synapse", address],
    queryFn: async () => {
      if (!signer) throw new Error("Signer not found");
      if (!address) throw new Error("Address not found");

      const synapse = await Synapse.create({
        signer,
        rpcURL: RPC_URLS.calibration.http,
      });

      return synapse;
    },
    staleTime: Infinity,
  });
};
