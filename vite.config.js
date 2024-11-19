import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/pokedex/', // Cambia esto por el nombre real de tu repositorio
  plugins: [
    vue(),
    // Solo habilitar vueDevTools en entorno de desarrollo
    process.env.NODE_ENV === 'development' ? vueDevTools() : null,
  ].filter(Boolean), // Elimina cualquier valor null de los plugins
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
