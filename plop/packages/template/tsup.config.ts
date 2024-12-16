import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'v1': 'exports/v1/index.ts',
  },
  format: ['esm'],
  sourcemap: true,
  treeshake: true,
  clean: true,
  dts: false, // we want to reference TS source files in package.json.exports if we can
});
