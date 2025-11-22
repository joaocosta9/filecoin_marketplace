"use client";

import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { useSynapse } from "@/hooks/useSynapse";
import { PDPServer, WarmStorageService } from "@filoz/synapse-sdk";

export type UserFile = {
  pdpVerifierDataSetId: string;
  providerId: string;
  pieceCid: string;
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

      const warmStorage = await WarmStorageService.create(
        synapse.getProvider(),
        synapse.getWarmStorageAddress(),
      );

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
              try {
                const pieceCid = piece.pieceCid.toV1().toString();
                const pieceId = (piece as unknown as { pieceId?: number })
                  ?.pieceId;

                if (!pieceId) {
                  // Fallback if pieceId doesn't exist
                  allFiles.push({
                    pdpVerifierDataSetId:
                      dataset.pdpVerifierDataSetId.toString(),
                    providerId: dataset.providerId.toString(),
                    pieceCid,
                  });
                  continue;
                }

                const metadata = await warmStorage.getPieceMetadata(
                  dataset.pdpVerifierDataSetId,
                  pieceId,
                );

                allFiles.push({
                  pdpVerifierDataSetId: dataset.pdpVerifierDataSetId.toString(),
                  providerId: dataset.providerId.toString(),
                  pieceCid,
                  title: metadata?.title,
                  description: metadata?.description,
                  category: metadata?.category,
                  price: metadata?.price,
                });
              } catch (error) {
                console.warn(
                  `Failed to fetch metadata for piece ${piece.pieceCid.toV1().toString()}:`,
                  error,
                );
                // Still add the file without metadata
                allFiles.push({
                  pdpVerifierDataSetId: dataset.pdpVerifierDataSetId.toString(),
                  providerId: dataset.providerId.toString(),
                  pieceCid: piece.pieceCid.toV1().toString(),
                });
              }
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
