import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    postcss: './postcss.config.js',
  },
  server: {
    port: 8080,
  },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: './index.html',
      output: {
        manualChunks: undefined,
      }
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});