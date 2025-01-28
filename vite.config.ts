import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  base: "/medtech-vl-standing-waves/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: "assets",
  },
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
