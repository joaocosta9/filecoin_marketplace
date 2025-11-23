import { useMutation } from "@tanstack/react-query";
import { fileTypeFromBuffer } from "file-type";
import { useAccount } from "wagmi";
import { Lit } from "@/lib/lit";
import type { EncryptToJsonPayload } from "@lit-protocol/encryption/node_modules/@lit-protocol/types";

const MARKETPLACE_CONTRACT_ADDRESS =
  "0x03996d8d526F82BdE5dD223499946aaf817AE30B";
const CHAIN = "filecoinCalibrationTestnet";
const DEFAULT_PROVIDER = "https://calibnet.pspsps.io";

export const useDownloadPiece = (
  pieceCid: string,
  filename: string,
  creatorAddress?: string,
  contentId?: string,
  serviceURL?: string,
  isCDN?: boolean,
) => {
  const { address } = useAccount();

  const mutation = useMutation({
    mutationKey: ["download", pieceCid],
    mutationFn: async () => {
      if (!address) throw new Error("Address not found");

      const downloadUrl = isCDN
        ? `https://${address}.calibration.filbeam.io/${pieceCid}`
        : serviceURL
          ? `${serviceURL}/piece/${pieceCid}`
          : `${DEFAULT_PROVIDER}/piece/${pieceCid}`;

      const response = await fetch(downloadUrl);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      let uint8ArrayBytes = new Uint8Array(arrayBuffer);

      if (creatorAddress && contentId) {
        const encryptedPayloadStr = new TextDecoder().decode(uint8ArrayBytes);
        const encryptedPayload: EncryptToJsonPayload =
          JSON.parse(encryptedPayloadStr);

        const lit = new Lit(
          CHAIN,
          creatorAddress,
          contentId,
          MARKETPLACE_CONTRACT_ADDRESS,
        );
        await lit.connect();
        const { decryptedFile } = await lit.decryptFile(encryptedPayload);

        uint8ArrayBytes =
          typeof decryptedFile === "string"
            ? new TextEncoder().encode(decryptedFile)
            : new Uint8Array(decryptedFile as any);

        filename = filename.replace(".encrypted", "");
      }

      const fileType = await fileTypeFromBuffer(uint8ArrayBytes);
      const file = new File([uint8ArrayBytes], filename, {
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
  });

  return {
    downloadMutation: mutation,
  };
};
