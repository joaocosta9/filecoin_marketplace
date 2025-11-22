import { useState } from "react";
import { Lit } from "@/lib/lit";
import type { EncryptToJsonPayload } from "@lit-protocol/encryption/node_modules/@lit-protocol/types";

const MARKETPLACE_CONTRACT_ADDRESS =
  "0x03996d8d526F82BdE5dD223499946aaf817AE30B";
const CHAIN = "filecoinCalibrationTestnet";

export const useLitEncryption = (creatorAddress: string, cid: string) => {
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const encryptFile = async (
    file: File
  ): Promise<EncryptToJsonPayload | null> => {
    if (!creatorAddress || !cid) {
      setError(
        new Error("Creator address and CID are required for encryption")
      );
      return null;
    }

    setIsEncrypting(true);
    setError(null);

    try {
      const lit = new Lit(CHAIN, creatorAddress, MARKETPLACE_CONTRACT_ADDRESS);
      await lit.connect();
      const encryptedPayload = await lit.encryptFile(file);
      return encryptedPayload;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Encryption failed");
      setError(error);
      console.error("Encryption error:", error);
      return null;
    } finally {
      setIsEncrypting(false);
    }
  };

  const decryptFile = async (
    payload: EncryptToJsonPayload
  ): Promise<Blob | null> => {
    if (!creatorAddress || !cid) {
      setError(
        new Error("Creator address and CID are required for decryption")
      );
      return null;
    }

    setIsDecrypting(true);
    setError(null);

    try {
      const lit = new Lit(CHAIN, creatorAddress, MARKETPLACE_CONTRACT_ADDRESS);
      await lit.connect();
      const { decryptedFile } = await lit.decryptFile(payload);

      if (typeof decryptedFile === "string") {
        return new Blob([decryptedFile], { type: "text/plain" });
      } else {
        const uint8Array = new Uint8Array(decryptedFile as any);
        return new Blob([uint8Array]);
      }
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Decryption failed - you may not have access");
      setError(error);
      console.error("Decryption error:", error);
      return null;
    } finally {
      setIsDecrypting(false);
    }
  };

  return {
    encryptFile,
    decryptFile,
    isEncrypting,
    isDecrypting,
    error,
  };
};
