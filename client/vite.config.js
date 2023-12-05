import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://user-management-seven-murex.vercel.app',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
};