import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "wagmi.generated.ts",
  plugins: [
    foundry({
      project: "./",
      // exclude: ["MockERC20.sol", "Sale.d.sol", "IERC20.sol"],
      // legacy name, for compatibility reasons
      namePrefix: "Sald",
      deployments: {
        Sale: {
          314159: "0x035dD367FD1F11260AD161Af6390Cb144CF113a6",
        },
      },
    }),
    react(),
  ],
});
