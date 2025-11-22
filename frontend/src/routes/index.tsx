import { createFileRoute, Link } from "@tanstack/react-router";
import { useAccount } from "wagmi";
import { ArrowRight, Store, Shield, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-6 shadow-2xl shadow-blue-500/25">
            <Store className="text-white" size={40} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Filecoin Marketplace
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Decentralized file storage and marketplace built on Filecoin
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isConnected ? (
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/profile" className="flex items-center gap-2">
                  Go to My Marketplace
                  <ArrowRight size={20} />
                </Link>
              </Button>
            ) : (
              <p className="text-gray-400">
                Connect your wallet to get started
              </p>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <div className="p-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/10">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
              <Shield className="text-blue-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Secure Storage</h3>
            <p className="text-gray-400">
              Your files are stored on the decentralized Filecoin network with
              cryptographic guarantees
            </p>
          </div>

          <div className="p-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
              <Zap className="text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Fast & Reliable</h3>
            <p className="text-gray-400">
              Lightning-fast uploads and downloads with redundant storage
              providers
            </p>
          </div>

          <div className="p-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-green-500/50 transition-all hover:shadow-xl hover:shadow-green-500/10">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
              <Globe className="text-green-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Global Marketplace</h3>
            <p className="text-gray-400">
              Buy and sell files in a truly decentralized marketplace with
              crypto payments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
