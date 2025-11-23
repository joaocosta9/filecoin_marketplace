import { useQuery } from "@tanstack/react-query";
import { useConfig, useChainId } from "wagmi";
import { getChain } from "@filoz/synapse-core/chains";
import {
  getDataSets,
  getPieces,
  type DataSet,
} from "@filoz/synapse-core/warm-storage";
import { metadataArrayToObject } from "@filoz/synapse-core/utils";
import { readContract } from "viem/actions";
import type { Address } from "viem";

export const useMultipleUserDataSets = (addresses: Address[]) => {
  const config = useConfig();
  const chainId = useChainId();
  const chain = getChain(chainId);

  return useQuery({
    queryKey: ["multiple-user-datasets", addresses, chainId],
    queryFn: async () => {
      if (!addresses || addresses.length === 0) return [];

      const allData = await Promise.all(
        addresses.map(async (address) => {
          try {
            const dataSets = await getDataSets(config.getClient(), { address });

            const dataSetsWithPieces = await Promise.all(
              dataSets.map(async (dataSet: DataSet) => {
                const piecesPaginated = await getPieces(config.getClient(), {
                  dataSet,
                  address,
                });

                const piecesWithMetadata = await Promise.all(
                  piecesPaginated.pieces.map(async (piece) => {
                    const metadata = await readContract(config.getClient(), {
                      address: chain.contracts.storageView.address,
                      abi: chain.contracts.storageView.abi,
                      functionName: "getAllPieceMetadata",
                      args: [dataSet.dataSetId, BigInt(piece.id)],
                    });
                    return {
                      ...piece,
                      metadata: metadataArrayToObject(metadata),
                    };
                  }),
                );

                return {
                  ...dataSet,
                  pieces: piecesWithMetadata,
                };
              }),
            );

            const files = dataSetsWithPieces.flatMap((dataset) =>
              dataset.pieces.map((piece) => ({
                pdpVerifierDataSetId: dataset.dataSetId.toString(),
                providerId: "",
                pieceCid: piece.cid.toString(),
                pieceId: BigInt(piece.id),
                dataSetId: dataset.dataSetId,
                clientDataSetId: dataset.dataSetId,
                title: piece.metadata?.title,
                description: piece.metadata?.description,
                category: piece.metadata?.category,
                price: piece.metadata?.price,
                serviceURL: dataset.pdp.serviceURL,
                isCDN: dataset.cdn,
                contentId: piece.metadata?.contentId,
                encrypted: piece.metadata?.encrypted,
                ownerAddress: address,
                dataset: dataset,
              })),
            );

            return files;
          } catch (error) {
            console.error(`Error fetching data for ${address}:`, error);
            return [];
          }
        }),
      );

      return allData.flat();
    },
    enabled: addresses && addresses.length > 0,
    refetchInterval: 60000,
  });
};
