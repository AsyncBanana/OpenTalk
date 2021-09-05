import { build } from 'esbuild'
import globPlugin from 'esbuild-plugin-import-glob'
build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/worker.js',
  bundle: true,
  format: 'esm',
  minify: false,
  target: ['chrome92'],
  // eslint-disable-next-line no-undef
  define: {
    'process.NODE_ENV': 'production',
  },
  plugins: [globPlugin.default()],
})
