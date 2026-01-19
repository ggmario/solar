import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      svgr(),
    ],
      base: '/solar/',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/assets/styles'),
        '@router': path.resolve(__dirname, 'src/router'),
      },
    },
  };
});
