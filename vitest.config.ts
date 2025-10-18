import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxDev: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [path.resolve(__dirname, "src/test/setupTests.ts")],
    css: false,
  },
  resolve: {
    alias: [
      { find: /^@\//, replacement: path.resolve(__dirname, "src") + "/" },
      { find: "@", replacement: path.resolve(__dirname, "src") },
    ],
  },
});
