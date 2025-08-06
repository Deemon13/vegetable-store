/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/

export default defineConfig({
  base: "/vegetable-store",
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
