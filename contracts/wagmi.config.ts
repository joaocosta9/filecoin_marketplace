import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "wagmi.generated.ts",
  plugins: [
    foundry({
      project: "./",
      // exclude: ["MockERC20.sol", "Sale.d.sol", "IERC20.sol"],
      // legacy name, for compatibility reasons
      namePrefix: "FilePlace",
      deployments: {
        Sale: {
          314159: "0x03996d8d526F82BdE5dD223499946aaf817AE30B",
        },
      },
    }),
    react(),
  ],
});
