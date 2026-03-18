import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        flappyVertical: resolve(__dirname, 'flappy-vertical/index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
      },
    },
  },
})