import { useMutation } from "@tanstack/react-query";
import { useEthersSigner } from "./useEthers";
import { useAccount } from "wagmi";

/**
 * Hook for opening piece data in a new tab.
 * Opens the piece data in a new tab using the piece CID and URL.
 * @param pieceCid - Piece CID identifying the file on Filecoin
 * @param isCDN - Whether the piece is stored on CDN
 * @param url - URL of the PDP service
 * @returns Mutation object for opening piece data in a new tab
 */
export const useOpenPieceDataInNewTab = (
  pieceCid: string,
  isCDN: boolean,
  url: string,
) => {
  const { address } = useAccount();
  const signer = useEthersSigner();

  const mutation = useMutation({
    mutationKey: ["openPieceDataInNewTab", `${pieceCid}-${isCDN}`],
    mutationFn: async () => {
      if (!signer) throw new Error("Signer not found");
      if (!address) throw new Error("Address not found");

      if (isCDN) {
        window.open(
          `https://${address}.calibration.filbeam.io/${pieceCid}`,
          "_blank",
        );
        return;
      } else {
        window.open(`${url}/piece/${pieceCid}`, "_blank");
        return;
      }
    },
    onSuccess: () => {
      console.log("Piece data opened in new tab", pieceCid);
    },
    onError: (error) => {
      console.error("Error opening piece data in new tab", error);
    },
  });

  return {
    openPieceDataInNewTabMutation: mutation,
  };
};
