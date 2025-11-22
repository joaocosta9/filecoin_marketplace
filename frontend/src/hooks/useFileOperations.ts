import { useDownloadPiece } from "./useDownloadPiece";
import { useOpenPieceDataInNewTab } from "./useOpenPieceDataInNewTab";
import { type UserFile } from "./useUserFiles";

/**
 * Unified hook for all file operations (download, view, etc.)
 * Consolidates multiple mutation hooks into one
 */
export const useFileOperations = (file: UserFile) => {
  const filename = file.title || `${file.pieceCid}.bin`;
  
  const { downloadMutation } = useDownloadPiece(file.pieceCid, filename);
  const { openPieceDataInNewTabMutation } = useOpenPieceDataInNewTab(
    file.pieceCid,
    file.isCDN || false,
    file.serviceURL || ""
  );

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
  };
};

