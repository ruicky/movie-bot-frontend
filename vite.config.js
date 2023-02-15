import { defineConfig, loadEnv } from "vite";
import legacy from '@vitejs/plugin-legacy'
import react from "@vitejs/plugin-react-swc";
import { ViteAliases } from 'vite-aliases'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: './',
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
        plugins: [["@swc/plugin-styled-components", {}]],
      }),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      ViteAliases(),  // Alias auto generation for Vite
    ],
    server: {
      host: '0.0.0.0',
      open: true,
      port: 3000,
      proxy: {
        '^(/api/|/user/|/static/).*': {
          target: env.VITE_DEV_PROXY || '',
          secure: false,
          changeOrigin: true,
        },
        '^/plugins/.*/logo.jpg': {
          target: env.VITE_DEV_PROXY || '',
          secure: false,
          changeOrigin: true,
        }
      }
    },
    build: {
      outDir: 'build'
    },
  }
});