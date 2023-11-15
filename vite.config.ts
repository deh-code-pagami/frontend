import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { pluginAPI } from "vite-plugin-api";


// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const plugins = [
    react()
  ]

  if(true || mode == 'development') {
    plugins.push([pluginAPI({})]);
  }

  return {
    plugins,
    server: {
      port: 3000
    }
  }
})
