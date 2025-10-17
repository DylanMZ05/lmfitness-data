// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  base: '/',

  build: {
    target: 'es2020',              // JS más moderno = menos peso
    sourcemap: false,             // No subir source maps a producción
    minify: 'terser',             // Minificación agresiva
    terserOptions: {
      compress: {
        drop_console: true,       // Saca console.log de producción
        drop_debugger: true,
        passes: 2
      },
      format: {
        comments: false
      }
    },

    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react']
        }
      }
    },

    chunkSizeWarningLimit: 800,
    modulePreload: { polyfill: false },
    cssCodeSplit: true
  },

  optimizeDeps: {
    include: [
      'react', 'react-dom', 'react-router-dom'
    ]
  }
})
