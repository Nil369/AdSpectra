import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    cors: true,
    proxy: {
      '/api': {
        target: 'https://debashruti2005-adspectra-api.hf.space',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // Remove headers here; they do not affect production or actual API responses
        // CORS must be handled by the target server, not the proxy
      }
    }
  }
})