import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // 'production' op de live site, 'preview' op previews, anders 'development'.
    __VERCEL_ENV__: JSON.stringify(process.env.VERCEL_ENV ?? 'development'),
  },
});
