import path from "path";

import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  plugins: [solid(), Icons({ compiler: "solid" })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
  },
});
