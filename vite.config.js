import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/TRABAJO-FULL-STACK-V2",
  server: {
    proxy: {
      '/api': {
        target: 'http://44.221.86.165:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
