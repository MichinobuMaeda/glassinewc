import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import dts from 'vite-plugin-dts';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: resolve(__dirname, 'docs'),
  resolve: {
    alias: {
      '/src': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 8000,
  },
  plugins: [
    dts({
      include: ['src'],
      rollupTypes: true,
      // Emit one .d.ts per entry point
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        glassinewc: resolve(__dirname, 'src/index.ts'),
        'glassinewc-button': resolve(__dirname, 'src/glassinewc-button.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      // Keep lit as a peer dep — not bundled
      external: ['lit', /^lit\//],
    },
    outDir: resolve(__dirname, 'dist'),
    sourcemap: true,
    emptyOutDir: true,
  },
});
