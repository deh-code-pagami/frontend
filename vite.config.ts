/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const plugins = [react()];

  const backendHost = process.env.BACKEND_HOST ?? "localhost";
  const backendPort = process.env.BACKEND_PORT ?? "1337";

  return {
    server: {
      host: true,
      port: 3000,
      proxy: {
        "/api": {
          target: `http://${backendHost}:${backendPort}`,
          changeOrigin: true,
        },
      },
    },
    plugins,
  };
});
