import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        mars: resolve(__dirname, "src/planet/index.html"),
        daily: resolve(__dirname, "src/daily/index.html"),
        favs: resolve(__dirname, "src/favs/index.html"),
      },
    },
  },
});
