import { configDefaults,  defineConfig } from 'vitest/config';

// @https://vitest.dev/config/
export default defineConfig({
  plugins: [],
  test: {
    // processing css files is slow, so we disable it
    css: false,
    globals: true,
    environment: 'jsdom',
    include: ['./tests/**/*.spec.ts?(x)'],
    exclude: [...configDefaults.exclude],
  },
});
