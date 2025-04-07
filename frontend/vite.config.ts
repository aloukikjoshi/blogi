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
    devSourcemap: true,
  },
  server: {
    port: 8080,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});