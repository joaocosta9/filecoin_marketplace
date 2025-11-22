import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { useSynapse } from "@/hooks/useSynapse";
import { useEthersSigner } from "@/hooks/useEthers";
import type { Category } from "@/constants/categories";
import { saveProduct } from "@/api/user";
import { useWriteFilePlaceSaleSetContent } from "../../wagmi.generated";
import { parseUnits } from "viem";

export type UploadedInfo = {
  fileName?: string;
  fileSize?: number;
  pieceCid?: string;
  txHash?: string;
};

export type FileUploadMetadata = {
  title: string;
  description: string;
  category: Category;
  price?: number;
  isPrivate?: boolean;
};

export const useFileUpload = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [uploadedInfo, setUploadedInfo] = useState<UploadedInfo | null>(null);
  const { address, chainId } = useAccount();
  const signer = useEthersSigner({ chainId });
  const queryClient = useQueryClient();

  const { data: synapse } = useSynapse(false);
  const { writeContract } = useWriteFilePlaceSaleSetContent();

  const mutation = useMutation({
    mutationKey: ["upload", address, chainId],
    mutationFn: async ({
      file,
      metadata,
      datasetId,
    }: {
      file: File;
      metadata: FileUploadMetadata;
      datasetId?: number;
      withCDN?: boolean;
    }) => {
      if (!address) throw new Error("Address not found");
      if (!signer) throw new Error("Signer not found");

      setProgress(0);
      setUploadedInfo(null);
      setStatus("🔄 Initializing file upload to Filecoin...");

      const arrayBuffer = await file.arrayBuffer();
      const uint8ArrayBytes = new Uint8Array(arrayBuffer);

      setStatus("🔗 Setting up storage service and dataset...");
      setProgress(25);
      if (!synapse) throw new Error("Synapse not initialized");

      const storageService = await synapse.storage.createContext({
        ...(datasetId && { dataSetId: datasetId }),
        callbacks: {
          onDataSetResolved: (info) => {
            console.log("Dataset resolved:", info);
            setStatus(
              datasetId
                ? "🔗 Using selected dataset"
                : "🔗 Existing dataset found and resolved",
            );
            setProgress(30);
          },
          onProviderSelected: (provider) => {
            console.log("Storage provider selected:", provider);
            setStatus(`🏪 Storage provider selected`);
          },
        },
      });

      setStatus("📁 Uploading file to storage provider...");
      setProgress(55);

      const { pieceCid } = await storageService.upload(uint8ArrayBytes, {
        metadata: {
          title: metadata.title,
          description: metadata.description,
          category: metadata.category,
          price: metadata.price?.toString() || "",
          isPrivate: metadata.isPrivate?.toString() || "false",
        },
        onUploadComplete: (piece) => {
          setStatus(
            `📊 File uploaded! Signing msg to add pieces to the dataset`
          );
          setUploadedInfo((prev) => ({
            ...prev,
            fileName: file.name,
            fileSize: file.size,
            pieceCid: piece.toV1().toString(),
          }));
          setProgress(80);
        },
        onPieceAdded: (hash) => {
          setStatus(
            `🔄 Waiting for transaction to be confirmed on chain (txHash: ${hash})`
          );
          setUploadedInfo((prev) => ({
            ...prev,
            txHash: hash,
          }));
        },
        onPieceConfirmed: () => {
          setStatus("🌳 Data pieces added to dataset successfully");
          setProgress(90);
        },
      });

      setProgress(95);
      setUploadedInfo((prev) => ({
        ...prev,
        fileName: file.name,
        fileSize: file.size,
        pieceCid: pieceCid.toV1().toString(),
      }));
      return {
        pieceCid: pieceCid.toV1().toString(),
        price: metadata.price || 0,
      };
    },
    onSuccess: async (data: { pieceCid: string; price: number }) => {
      alert("File successfully stored on Filecoin!");
      setStatus("🎉 File successfully stored on Filecoin!");
      setProgress(100);
      queryClient.invalidateQueries({
        queryKey: ["balances", address, chainId],
      });
      queryClient.invalidateQueries({
        queryKey: ["datasets", address, chainId],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-files", address, chainId],
      });
      const productId = await saveProduct(
        data.pieceCid,
        address as `0x{string}`
      );
      writeContract({
        args: [productId, parseUnits(data.price.toString(), 18)],
      });
    },
    onError: (error) => {
      console.error("Upload failed:", error);
      setStatus(`❌ Upload failed: ${error.message || "Please try again"}`);
      setProgress(0);
    },
  });

  const handleReset = () => {
    setProgress(0);
    setUploadedInfo(null);
    setStatus("");
  };

  return {
    uploadFileMutation: mutation,
    progress,
    uploadedInfo,
    handleReset,
    status,
  };
};
