import { defineConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    istanbul({
      include: 'src/*',
      exclude: ['node_modules', 'test/'],
      extension: ['.ts', '.tsx'],
      requireEnv: true,
    }),
  ],
  server: {
    port: 3000,
    watch: {
      ignored: ['**/coverage/**'],
    },
  },
  build: {
    sourcemap: true,
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      reportsDirectory: './coverage/unit',
      reporter: ['lcovonly', 'text'],
    },
  },
});
