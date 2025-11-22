import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useFund } from "../hooks/useFund";
import { useAccount } from "wagmi";

export default function Header() {
  const { mutate: fund, isPending } = useFund();
  const { isConnected } = useAccount();
  return (
    <header className="p-4 flex items-center bg-gray-800 text-white shadow-lg">
      {isConnected && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={() => {
            fund();
          }}
          disabled={isPending || !isConnected}
        >
          {isPending ? "Funding..." : "Fund"}
        </button>
      )}
      <div className="flex items-center justify-end w-full">
        <ConnectButton />
      </div>
    </header>
  );
}
