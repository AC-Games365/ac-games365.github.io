import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        flappyVertical: resolve(__dirname, 'flappy-vertical/index.html'),
        blockDrift: resolve(__dirname, 'block-drift/index.html'),
        sliceAndTrap: resolve(__dirname, 'slice-and-trap/index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
        terms: resolve(__dirname, 'terms/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        drivewise: resolve(__dirname, 'drivewise/index.html'),
        notfound: resolve(__dirname, '404.html'),
      },
    },
  },
})