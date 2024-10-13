// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  sourcemap: true,
  dts: true, 
  clean: true,
  external: ['react', 'react-dom', 'styled-components'],
});
