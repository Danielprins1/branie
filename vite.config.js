import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // cadeau.html is dezelfde app met eigen titel, omschrijving en Open Graph-gegevens,
      // zodat zoekmachines en social media die zonder JavaScript kunnen lezen.
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        cadeau: resolve(import.meta.dirname, 'cadeau.html'),
      },
    },
  },
  define: {
    // 'production' op de live site, 'preview' op previews, anders 'development'.
    __VERCEL_ENV__: JSON.stringify(process.env.VERCEL_ENV ?? 'development'),
  },
});
