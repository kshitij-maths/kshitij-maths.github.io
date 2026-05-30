import { defineConfig } from 'vite';
import { cpSync, existsSync } from 'fs';
import { resolve } from 'path';

/** Copy static HTML fragments and images into dist (not processed by Rollup). */
function copyStaticAssetsPlugin() {
  return {
    name: 'copy-static-assets',
    closeBundle() {
      for (const dir of ['sections', 'images']) {
        const src = resolve(__dirname, dir);
        if (!existsSync(src)) continue;
        cpSync(src, resolve(__dirname, 'dist', dir), { recursive: true });
      }
    },
  };
}

export default defineConfig({
  plugins: [copyStaticAssetsPlugin()],
  server: {
    port: 5173,
    open: true,
    cors: true,
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['./js/main.js'],
        },
      },
    },
  },
  preview: {
    port: 4173,
  },
});
