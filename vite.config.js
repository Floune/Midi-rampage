import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import { resolve } from 'path';

export default defineConfig({
  plugins: [eslint()],
  resolve: {
    alias: {
      '@assets': resolve(__dirname, './src/assets'),
      '@game': resolve(__dirname, './src/scripts'),
      '@scenes': resolve(__dirname, './src/scripts/scenes'),
      '@objects': resolve(__dirname, './src/scripts/objects'),
      '@utils': resolve(__dirname, './src/scripts/utils'),
      '@components': resolve(__dirname, './src/scripts/components'),
      '@constants': resolve(__dirname, './src/scripts/constants.ts'),
      '@types': resolve(__dirname, './src/scripts/types.ts')
    }
  },
  build: {
    // phaser doesn't accept inlined assets
    assetsInlineLimit: 0
  },
  server: {
    host: process.env.VITE_HOST ? process.env.VITE_HOST : '0.0.0.0',
    port: 3000,
    open: '/',
    hmr: {
      overlay: false
    }
  },
  clearScreen: false
});
