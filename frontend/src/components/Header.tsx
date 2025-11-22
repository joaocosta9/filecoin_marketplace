import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "@tanstack/react-router";
import { useFund } from "@/hooks/useFund";
import { useAccount } from "wagmi";
import { Button } from "./ui/button";
import { User } from "lucide-react";

export default function Header() {
  const { isConnected } = useAccount();
  const { mutate: fund, isPending } = useFund();

  return (
    <header className="p-4 flex items-center bg-gray-800 text-white shadow-lg">
      <div className="flex items-center gap-3">
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
        {isConnected && (
          <Button asChild>
            <Link to="/profile" className="flex items-center gap-2">
              <User size={16} />
              Profile
            </Link>
          </Button>
        )}
      </div>
      <div className="flex items-center justify-end w-full">
        <ConnectButton />
      </div>
    </header>
  );
}
