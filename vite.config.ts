// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',

  build: {
    target: 'es2020',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
        // Opcional: elimina console.* “puros”
        pure_funcs: ['console.info','console.debug','console.trace']
      },
      format: { comments: false }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react','react-dom'],
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
    include: ['react','react-dom','react-router-dom']
  }
})
