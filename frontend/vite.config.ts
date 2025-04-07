import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_API_URL || '/blogi/frontend/',
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  server: {
    port: 8080,
  },
  build: {
    rollupOptions: {
      input: './index.html', // Fix this line - @/ alias doesn't work here
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});