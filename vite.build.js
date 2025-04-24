import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // ou react ou vanilla

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist'
  }
})
