import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import size from 'rollup-plugin-size'
import externalDeps from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import visualizer from 'rollup-plugin-visualizer';
import replace from '@rollup/plugin-replace';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package.json')

const libraryName = 'lib-jitsi'

const extensions = ['.js', '.es6', '.es', '.mjs', '.ts']
const babelConfig = { extensions, runtimeHelpers: true }
const resolveConfig = { extensions }

export default {
  input: `src/index.ts`,
  output: [
    {
      file: pkg.main,
      name: libraryName,
      format: 'umd',
      sourcemap: true
    },
    { file: pkg.module,
      format: 'es',
      sourcemap: true
    },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    resolve(resolveConfig),
    babel(babelConfig),
    commonjs(),
    externalDeps(),
    terser(),
    size(),
  ],
}
