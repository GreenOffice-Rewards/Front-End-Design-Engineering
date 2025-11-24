/// <reference types="node" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    host: '0.0.0.0',
    strictPort: true,
    hmr: {
      host: process.env.REPLIT_DOMAINS || 'localhost',
      clientPort: 443,
      protocol: 'wss'
    }
  }
})