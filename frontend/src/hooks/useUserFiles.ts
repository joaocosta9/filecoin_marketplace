"use client";

import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { useSynapse } from "@/hooks/useSynapse";
import { PDPServer } from "@filoz/synapse-sdk";

export type UserFile = {
  pdpVerifierDataSetId: string;
  providerId: string;
  pieceCid: string;
  title?: string;
  description?: string;
  category?: string;
  price?: string;
};

type PieceMetadata = {
  title?: string;
  description?: string;
  category?: string;
  price?: string;
};

export const useUserFiles = () => {
  const { address, chainId, isConnected } = useAccount();
  const { data: synapse } = useSynapse(false);

  return useQuery({
    enabled: !!isConnected && !!address && !!synapse,
    queryKey: ["user-files", address, chainId],
    queryFn: async () => {
      if (!synapse) throw new Error("Synapse not initialized");
      if (!address) throw new Error("Address not found");

      const datasets = await synapse.storage.findDataSets();

      const allFiles: UserFile[] = [];

      await Promise.all(
        datasets.map(async (dataset) => {
          try {
            const provider = await synapse.getProviderInfo(dataset.providerId);
            const serviceURL = provider.products.PDP?.data.serviceURL;

            if (!serviceURL) {
              return;
            }

            const pdpServer = new PDPServer(null, serviceURL);
            const data = await pdpServer.getDataSet(
              dataset.pdpVerifierDataSetId,
            );

            for (const piece of data.pieces) {
              const metadata =
                (piece as unknown as { metadata?: PieceMetadata })?.metadata ||
                {};

              allFiles.push({
                pdpVerifierDataSetId: dataset.pdpVerifierDataSetId.toString(),
                providerId: dataset.providerId.toString(),
                pieceCid: piece.pieceCid.toV1().toString(),
                title: metadata.title,
                description: metadata.description,
                category: metadata.category,
                price: metadata.price,
              });
            }
          } catch (error) {
            console.warn(
              `Failed to fetch details for dataset ${dataset.pdpVerifierDataSetId}:`,
              error,
            );
          }
        }),
      );

      return allFiles.reverse();
    },
  });
};
