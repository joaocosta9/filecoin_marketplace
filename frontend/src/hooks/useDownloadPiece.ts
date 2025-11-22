import { useMutation } from "@tanstack/react-query";
import { Synapse, RPC_URLS } from "@filoz/synapse-sdk";
import { fileTypeFromBuffer } from "file-type";
import { useEthersSigner } from "./useEthers";
import { useAccount } from "wagmi";
import { Lit } from "@/lib/lit";
import type { EncryptToJsonPayload } from "@lit-protocol/encryption/node_modules/@lit-protocol/types";

const MARKETPLACE_CONTRACT_ADDRESS =
  "0xC73C6a51eA83E63c2bB589813930c54ccFB68B91";
const CHAIN = "filecoinCalibrationTestnet";

const identifyFileType = async (uint8Array: Uint8Array) =>
  await fileTypeFromBuffer(uint8Array);

export const useDownloadPiece = (
  pieceCid: string,
  filename: string,
  encrypted?: boolean,
  creatorAddress?: string
) => {
  const { chainId, address } = useAccount();
  const signer = useEthersSigner({ chainId });

  const mutation = useMutation({
    mutationKey: ["download", pieceCid],
    mutationFn: async () => {
      if (!signer) throw new Error("Signer not found");
      if (!address) throw new Error("Address not found");

      const synapse = await Synapse.create({
        signer,
        rpcURL: RPC_URLS.calibration.http,
      });
      let uint8ArrayBytes = await synapse.storage.download(pieceCid);

      // if (encrypted && creatorAddress) {
      //   const encryptedPayloadStr = new TextDecoder().decode(uint8ArrayBytes);
      //   const encryptedPayload: EncryptToJsonPayload =
      //     JSON.parse(encryptedPayloadStr);

      //   const lit = new Lit(
      //     CHAIN,
      //     creatorAddress,
      //     MARKETPLACE_CONTRACT_ADDRESS,
      //   );
      //   await lit.connect();
      //   const { decryptedFile } = await lit.decryptFile(encryptedPayload);

      //   if (typeof decryptedFile === "string") {
      //     uint8ArrayBytes = new TextEncoder().encode(decryptedFile);
      //   } else {
      //     uint8ArrayBytes = new Uint8Array(decryptedFile as any);
      //   }

      //   filename = filename.replace(".encrypted", "");
      // }

      const fileType = await identifyFileType(uint8ArrayBytes);

      const file = new File([uint8ArrayBytes as BlobPart], filename, {
        type: fileType?.mime,
      });

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
