import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export const useOpenPieceDataInNewTab = (
  pieceCid: string,
  isCDN: boolean,
  url: string,
) => {
  const { address } = useAccount();

  const mutation = useMutation({
    mutationKey: ["openPieceDataInNewTab", pieceCid],
    mutationFn: async () => {
      if (!address) throw new Error("Address not found");

      const viewUrl = isCDN
        ? `https://${address}.calibration.filbeam.io/${pieceCid}`
        : `${url}/piece/${pieceCid}`;

      window.open(viewUrl, "_blank");
    },
  });

  return {
    openPieceDataInNewTabMutation: mutation,
  };
};
