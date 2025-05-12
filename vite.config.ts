import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

const root = path.resolve(__dirname, 'src');

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
        theme_color: '#5c2626',
        icons: [],
      },
    }),
  ],
  server: {
    host: true,
    allowedHosts: ['.ngrok-free.app'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  build: {
    // This tells Vite to clean `dist/` but not worry about test files,
    // as they’re never imported into production code anyway.
    emptyOutDir: true,
  },
});

