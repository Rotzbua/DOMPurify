import fs from 'fs';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';
import pkg from './package.json' with { type: 'json' };

const env = process.env.NODE_ENV;
const version = process.env.npm_package_version;
const license = fs
  .readFileSync('./src/license_header', 'utf8')
  .replace(/VERSION/gi, version);

const commonOutputConfig = {
  name: 'DOMPurify',
  sourcemap: true,
  banner: license,
  exports: 'default',
};

// 🔧 Plugin to strip named type exports from .d.ts for CommonJS
const stripNamedTypeExports = () => ({
  name: 'strip-named-type-exports',
  transform(code, id) {
    if (id.endsWith('.d.ts')) {
      return {
        code: code.replace(/^export\s+\{\s*type[\s\S]+?^\};\s*$/gm, ''),
        map: null,
      };
    }
  },
});

const config = [
  {
    input: 'src/purify.ts',
    external: [],
    output: [
      {
        ...commonOutputConfig,
        file: pkg.exports['.'].browser.default,
        format: 'umd',
      },
      {
        ...commonOutputConfig,
        file: pkg.exports['.'].production.default,
        format: 'umd',
        plugins: [terser()],
      },
      {
        ...commonOutputConfig,
        file: pkg.exports['.'].import.default,
        format: 'es',
      },
      {
        ...commonOutputConfig,
        file: pkg.exports['.'].require.default,
        format: 'cjs',
      },
    ],
    plugins: [
      typescript(),
      babel({
        babelHelpers: 'bundled',
        exclude: ['**/node_modules/**'],
        extensions: [...DEFAULT_EXTENSIONS, '.ts'],
      }),
      nodeResolve(),
      replace({
        preventAssignment: true,
        values: {
          'process.env.NODE_ENV': JSON.stringify(env),
          VERSION: `'${version}'`,
        },
      }),
    ],
  },

  // ESM type declarations
  {
    input: './dist/types/purify.d.ts',
    output: [
      {
        file: pkg.exports['.'].import.types,
        format: 'es',
        banner: commonOutputConfig.banner,
      },
    ],
    plugins: [dts()],
  },

  // CJS type declarations with named export stripping
  {
    input: './dist/types/purify.d.ts',
    output: [
      {
        file: pkg.exports['.'].require.types,
        format: 'cjs',
        banner: commonOutputConfig.banner,
      },
    ],
    plugins: [
      stripNamedTypeExports(),
      dts(),
    ],
  },
];

export default config;
