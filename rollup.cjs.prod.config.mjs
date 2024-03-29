import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'


export default {
  input: './app/src/circJson.ts',
  output: {
    dir: 'app/dist/cjs',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    typescript({tsconfig: "./tsconfig.cjs.json", noEmitOnError: false, sourceMap: true}), 
    resolve({modulesOnly: true, preferBuiltins: true}),
    commonJS({
      include: 'node_modules/**'
    }),
    json()
  ]
};
