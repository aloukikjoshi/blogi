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
    postcss: './postcss.config.cjs', // Changed extension
    devSourcemap: true,
  },
  server: {
    port: 8080,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        // Force a predictable CSS filename
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/style-[hash].css';
          }
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    // Turn OFF CSS code splitting
    cssCodeSplit: false,
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