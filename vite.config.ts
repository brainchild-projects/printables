import { defineConfig } from 'vite'
import istanbul from 'vite-plugin-istanbul'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    istanbul({
      include: 'src/*',
      exclude: ['node_modules', 'test/'],
      extension: ['.ts', '.tsx'],
      requireEnv: true,
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    sourcemap: true,
  }
})
