import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  base: '/', 


  build: {
    sourcemap: true,        // genera *.map (podés quitarlo si no querés subir maps)
    assetsDir: 'assets',    // default igual, lo dejo explícito
    // cssCodeSplit: true    // default
  }
})
