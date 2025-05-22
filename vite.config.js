// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // any request starting with /api will be forwarded:
      '/api': {
        target: '${import.meta.env.VITE_API_BASE}',
        changeOrigin: true,
        secure: false,      // if you ever use HTTPS on 5000
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
