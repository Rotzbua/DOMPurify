import { FlatXoConfig } from 'xo';

const xoConfig: FlatXoConfig = {
  space: 2,
  rules: {
    '@stylistic/block-spacing': 'off',
    '@stylistic/comma-dangle': 'off',
    '@stylistic/function-paren-newline': 'off',
    '@stylistic/object-curly-spacing': 'off',
    '@stylistic/operator-linebreak': 'off',
    'logical-assignment-operators': 'off',
    'unicorn/no-instanceof-builtins': 'off',
    'unicorn/no-nested-ternary': 'off',
    'unicorn/prefer-global-this': 'off',
    'unicorn/prefer-node-remove': 'off',
    'unicorn/prefer-optional-catch-binding': 'off',
    'unicorn/prevent-abbreviations': 'off',

    camelcase: ['error', { properties: 'never' }],

    // TypeScript-related XO overrides
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-deprecated': 'off',
    '@typescript-eslint/no-restricted-types': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-function-type': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/prefer-includes': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
  },
};

export default xoConfig;
