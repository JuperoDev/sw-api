import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue(), VueJsx()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'test/setup.js',
  },
});
