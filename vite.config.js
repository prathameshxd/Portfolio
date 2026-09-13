import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('firebase')) return 'vendor-firebase';
            if (id.includes('ogl')) return 'vendor-ogl';
            if (id.includes('react-icons') || id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom') || id.includes('react-helmet-async')) return 'vendor-react';
          }
        }
      }
    }
  }
})

