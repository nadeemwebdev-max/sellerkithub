import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    outDir: 'dist',
    target: ['es2020', 'chrome87', 'safari14'],
    cssCodeSplit: true,
    modulePreload: {
      polyfill: false,
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('jsbarcode') || id.includes('qrcode')) return 'vendor-code-gen';
            if (id.includes('react-router-dom') || id.includes('react-dom') || id.includes('react')) return 'vendor-react';
            return 'vendor';
          }
        }
      }
    }
  },
  server: {
    port: 3000,
  }
})
