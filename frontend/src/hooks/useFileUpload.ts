import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { useSynapse } from "@/hooks/useSynapse";
import { useEthersSigner } from "@/hooks/useEthers";
import type { Category } from "@/constants/categories";
import { useWriteFilePlaceSaleSetContent } from "../../wagmi.generated";
import { parseUnits } from "viem";
import { Lit } from "@/lib/lit";

const MARKETPLACE_CONTRACT_ADDRESS =
  "0x03996d8d526F82BdE5dD223499946aaf817AE30B";
const CHAIN = "filecoinCalibrationTestnet";

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

      // Generate a UUID that will be used for access control
      // This UUID will be stored in metadata and used in the Sale contract
      const contentId = crypto.randomUUID();
      let fileToUpload = file;

      if (metadata.price && metadata.price > 0) {
        setStatus("🔐 Encrypting file with Lit Protocol...");
        setProgress(10);

        // Encrypt with the UUID - this same UUID will be used in the contract
        const lit = new Lit(
          CHAIN,
          address,
          contentId,
          MARKETPLACE_CONTRACT_ADDRESS,
        );
        await lit.connect();
        const encryptedPayload = await lit.encryptFile(file);

        if (!encryptedPayload) {
          throw new Error("Failed to encrypt file");
        }

        const encryptedBlob = new Blob([JSON.stringify(encryptedPayload)], {
          type: "application/json",
        });
        fileToUpload = new File([encryptedBlob], `${file.name}.encrypted`, {
          type: "application/json",
        });

        setStatus("✅ File encrypted successfully");
        setProgress(20);
      }

      const arrayBuffer = await fileToUpload.arrayBuffer();
      const uint8ArrayBytes = new Uint8Array(arrayBuffer);

      setStatus("🔗 Setting up storage service and dataset...");
      setProgress(25);
      if (!synapse) throw new Error("Synapse not initialized");

      const storageService = await synapse.storage.createContext({
        ...(datasetId && { dataSetId: datasetId }),
        callbacks: {
          onDataSetResolved: () => {
            setStatus(
              datasetId
                ? "🔗 Using selected dataset"
                : "🔗 Existing dataset found and resolved",
            );
            setProgress(30);
          },
          onProviderSelected: () => {
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
          price: metadata.price?.toString() || "0",
          contentId: contentId, // Store the UUID for access control
        },
        onUploadComplete: (piece) => {
          setStatus(
            `📊 File uploaded! Signing msg to add pieces to the dataset`,
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
            `🔄 Waiting for transaction to be confirmed on chain (txHash: ${hash})`,
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
        contentId: contentId, // Return the UUID
      };
    },
    onSuccess: async (data: {
      pieceCid: string;
      price: number;
      contentId: string;
    }) => {
      setProgress(100);

      // Register in Sale contract with the contentId (UUID), not pieceCid
      if (data.price > 0) {
        writeContract({
          args: [data.contentId, parseUnits(data.price.toString(), 18)],
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["balances", address, chainId],
      });
      queryClient.invalidateQueries({
        queryKey: ["datasets", address, chainId],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-files", address, chainId],
      });
      setStatus("🎉 File successfully stored on Filecoin!");
      alert("File successfully stored on Filecoin!");
    },
    onError: (error) => {
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
