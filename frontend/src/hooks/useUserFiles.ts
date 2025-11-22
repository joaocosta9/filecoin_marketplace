"use client";

import { useMemo } from "react";
import { useAccount } from "wagmi";
import { useDataSets } from "@filoz/synapse-react";

export type UserFile = {
  pdpVerifierDataSetId: string;
  providerId: string;
  pieceCid: string;
  pieceId?: bigint;
  dataSetId?: bigint;
  clientDataSetId?: bigint;
  title?: string;
  description?: string;
  category?: string;
  price?: string;
  serviceURL?: string;
  isCDN?: boolean;
  encrypted?: string;
};

export const useUserFiles = (datasetId?: string) => {
  const { address } = useAccount();
  const { data: datasets, isLoading, error } = useDataSets({ address });

  const files = useMemo(() => {
    if (!datasets) return undefined;

    // Filter by dataset if specified
    const filteredDatasets = datasetId
      ? datasets.filter((d) => d.dataSetId.toString() === datasetId)
      : datasets;

    // Transform datasets with pieces into flat file list
    const allFiles: UserFile[] = filteredDatasets.flatMap((dataset) => {
      return dataset.pieces.map((piece) => ({
        pdpVerifierDataSetId:
          (dataset as any).pdpVerifierDataSetId?.toString() ||
          dataset.dataSetId.toString(),
        providerId: (dataset as any).providerId?.toString() || "",
        pieceCid: piece.cid.toString(),
        pieceId: BigInt(piece.id),
        dataSetId: dataset.dataSetId,
        clientDataSetId: (dataset as any).clientDataSetId || dataset.dataSetId,
        title: piece.metadata?.title,
        description: piece.metadata?.description,
        category: piece.metadata?.category,
        price: piece.metadata?.price,
        serviceURL: dataset.pdp.serviceURL,
        isCDN: dataset.cdn,
      }));
    });

    // Reverse to show newest first
    return allFiles.reverse();
  }, [datasets, datasetId]);

  return {
    data: files,
    isLoading,
    error,
  };
};
