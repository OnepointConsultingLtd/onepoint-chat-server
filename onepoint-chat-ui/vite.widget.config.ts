import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// IIFE bundle for third-party embed: load after window.__OSCA_CONFIG__ is set.
// Run after the main SPA build: `vite build && vite build -c vite.widget.config.ts`
export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/widget.tsx'),
      name: 'OscaWidget',
      formats: ['iife'],
      fileName: () => 'widget.iife.js',
    },
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        assetFileNames: 'widget[extname]',
      },
    },
  },
});
