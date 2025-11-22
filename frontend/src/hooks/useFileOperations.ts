import { useDownloadPiece } from "./useDownloadPiece";
import { useOpenPieceDataInNewTab } from "./useOpenPieceDataInNewTab";
import { useDeletePiece } from "./useDeletePiece";
import { type UserFile } from "./useUserFiles";
import { useAccount } from "wagmi";

export const useFileOperations = (file: UserFile, dataset?: any) => {
  const { address } = useAccount();
  const filename = file.title || `${file.pieceCid}.bin`;
  const isEncrypted = file.encrypted === "true";

  const { downloadMutation } = useDownloadPiece(
    file.pieceCid,
    filename,
    isEncrypted,
    address,
  );
  const { openPieceDataInNewTabMutation } = useOpenPieceDataInNewTab(
    file.pieceCid,
    file.isCDN || false,
    file.serviceURL || "",
  );
  const deletePieceMutation = useDeletePiece();

  return {
    download: {
      mutate: downloadMutation.mutate,
      isPending: downloadMutation.isPending,
      isError: downloadMutation.isError,
      error: downloadMutation.error,
    },
    view: {
      mutate: openPieceDataInNewTabMutation.mutate,
      isPending: openPieceDataInNewTabMutation.isPending,
      isError: openPieceDataInNewTabMutation.isError,
      error: openPieceDataInNewTabMutation.error,
      isAvailable: !!file.serviceURL,
    },
    delete: {
      mutation: deletePieceMutation,
      dataset,
      pieceId: file.pieceId,
      isAvailable: !!(file.pieceId && dataset),
    },
  };
};
