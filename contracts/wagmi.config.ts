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
          314159: "0xC73C6a51eA83E63c2bB589813930c54ccFB68B91",
        },
      },
    }),
    react(),
  ],
});
