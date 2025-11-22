import { useMutation } from "@tanstack/react-query";
import { Synapse, RPC_URLS } from "@filoz/synapse-sdk";
import { fileTypeFromBuffer } from "file-type";
import { useEthersSigner } from "./useEthers";
import { useAccount } from "wagmi";

const identifyFileType = async (uint8Array: Uint8Array) =>
  await fileTypeFromBuffer(uint8Array);

export const useDownloadPiece = (pieceCid: string, filename: string) => {
  const { chainId } = useAccount();
  const signer = useEthersSigner({ chainId });

  const mutation = useMutation({
    mutationKey: ["download", pieceCid],
    mutationFn: async () => {
      if (!signer) throw new Error("Signer not found");

      const synapse = await Synapse.create({
        signer,
        rpcURL: RPC_URLS.calibration.http,
      });
      const uint8ArrayBytes = await synapse.storage.download(pieceCid);
      const fileType = await identifyFileType(uint8ArrayBytes);

      const file = new File([uint8ArrayBytes as BlobPart], filename, {
        type: fileType?.mime,
      });

      // Trigger browser download
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);

      return file;
    },
    onSuccess: () => {
      console.log("File downloaded", filename);
    },
    onError: (error) => {
      console.error("Error downloading piece", error);
    },
  });

  return {
    downloadMutation: mutation,
  };
};
