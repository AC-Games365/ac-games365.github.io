import { cpSync } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// Files referenced by absolute URL (Open Graph images, PWA manifest) must keep
// a stable, unhashed path in the build.
const copyStableAssets = () => ({
  name: 'copy-stable-assets',
  closeBundle() {
    for (const dir of ['brand', 'social']) {
      cpSync(resolve(__dirname, 'assets', dir), resolve(__dirname, 'dist/assets', dir), { recursive: true })
    }
  },
})

export default defineConfig({
  base: '/',
  plugins: [copyStableAssets()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        flappyVertical: resolve(__dirname, 'flappy-vertical/index.html'),
        blockDrift: resolve(__dirname, 'block-drift/index.html'),
        sliceAndTrap: resolve(__dirname, 'slice-and-trap/index.html'),
        robotDefense: resolve(__dirname, 'robot-defense/index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
        terms: resolve(__dirname, 'terms/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        drivewise: resolve(__dirname, 'drivewise/index.html'),
        gifty: resolve(__dirname, 'gifty/index.html'),
        notfound: resolve(__dirname, '404.html'),
      },
    },
  },
})
