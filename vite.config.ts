import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE: '/' for a <name>.github.io repo or custom domain, '/<repo>/' for a project page.
export default defineConfig({
  base: process.env.BASE ?? '/',
  plugins: [react()],
  server: { port: 5180 },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        visit: resolve(__dirname, 'visit/index.html'),
      },
    },
  },
})
