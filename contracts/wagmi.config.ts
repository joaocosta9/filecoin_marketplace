import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "wagmi.generated.ts",
  plugins: [
    foundry({
      project: "./",
      namePrefix: "FilePlace",
      deployments: {
        Sale: {
          314159: "0x44aFd451fa623e06d869f48Ea612804678225Caa",
        },
      },
    }),
    react(),
  ],
});
