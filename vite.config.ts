import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';


const root = path.resolve(__dirname, "src");

export default defineConfig({
 resolve: {
    alias: {
      '@': root,
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
      },
      manifest: {
        name: 'Eswatini Shop',
        short_name: 'Eswatini',
        description: 'Eswatini Number 1 Online shop',
        theme_color: '#ffffff',
        icons: [],
      },
    })

    ],
      server: {
    host: true, // this lets Vite listen on 0.0.0.0
    allowedHosts: ['.ngrok-free.app'], // ✅ allow any *.ngrok-free.app
  },
})

