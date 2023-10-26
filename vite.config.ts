import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: '/src/components',
      },
      {
        find: '@context',
        replacement: '/src/context',
      },
      {
        find: '@provider',
        replacement: '/src/provider',
      },
      {
        find: '@assets',
        replacement: '/src/assets',
      },
      {
        find: '@hooks',
        replacement: '/src/hooks',
      },
      {
        find: '@pages',
        replacement: '/src/pages',
      },
      {
        find: '@services',
        replacement: '/src/services',
      },
      {
        find: 'interfaces',
        replacement: '/src/interfaces',
      },
      {
        find: '@',
        replacement: '/src',
      },
    ],
  },
});
