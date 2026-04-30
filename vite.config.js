import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    // 1. ADIM: Root'u ana dizine çek (src silindi)
    root: './', 
    
    build: {
      sourcemap: true,
      rollupOptions: {
        // 2. ADIM: Input yolunu güncelle (Artık html dosyaları ana dizinde)
        input: glob.sync('./*.html'), 
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      // 3. ADIM: outDir'i düzelt (Artık dist bir üstte değil, yan yana olacak)
      outDir: 'dist', 
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(),
      // 4. ADIM: Reload yolunu güncelle
      FullReload(['./**.html']),
      SortCss({
        sort: 'mobile-first',
      }),
    ],
  };
});