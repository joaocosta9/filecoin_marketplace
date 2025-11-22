import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "@tanstack/react-router";
import { useFund } from "@/hooks/useFund";
import { useAccount } from "wagmi";
import { Button } from "./ui/button";
import { User, Store } from "lucide-react";

export default function Header() {
  const { isConnected } = useAccount();
  const { mutate: fund, isPending } = useFund();

  return (
    <header className="p-4 flex items-center bg-gray-800/50 backdrop-blur-md border-b border-gray-700/50 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <User size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg">Filecoin Marketplace</span>
        </Link>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline">
            <Link
              to="/marketplace"
              className="flex items-center gap-2 text-black"
            >
              <Store size={16} />
              Marketplace
            </Link>
          </Button>
          {isConnected && (
            <>
              <Button asChild variant="outline">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-black"
                >
                  <User size={16} />
                  My Marketplace
                </Link>
              </Button>
              <button
                className="bg-blue-600/80 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors font-medium"
                onClick={() => {
                  fund();
                }}
                disabled={isPending || !isConnected}
              >
                {isPending ? "Funding..." : "Fund"}
              </button>
            </>
          )}
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
