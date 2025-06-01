import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import Icon from "./assets/icon.png"
import LargerIcon from "./assets/largerIcon.png"

export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      injectRegister: 'auto',
      manifest: {
        name: 'Darts Score',
        short_name: 'Darts',
        description: 'Darts Score',
        theme_color: '#000',
        icons: [
          {
            src: '/icons/icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/largerIcon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
});

