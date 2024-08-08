/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const plugins = [react()];

  return {
    server: {
      host: true,
      port: 3000,
      proxy: {
        "/api": {
          target: "http://localhost:1337",
          changeOrigin: true,
        },
      },
    },
    plugins,
  };
});
