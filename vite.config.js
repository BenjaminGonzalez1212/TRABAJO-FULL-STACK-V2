import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/TRABAJO-FULL-STACK-V2",
  server: {
    proxy: {
      '/api': {
        target: 'http://34.232.63.215:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
