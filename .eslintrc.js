module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    node: true,
  },
  globals: {
    Promise: true,
  },
  overrides: [
    {
      files: [
        'jest/setup.js',
        '__tests__/*.js',
        '__mocks__/*.js',
        '*.test.js',
        '*.spec.js',
        'e2e/**/*.js',
        '*e2e-spec.ts',
        '*.spec.ts',
      ],
      env: {
        jest: true,
        jasmine: true,
      },
    },
  ],
  parser: 'babel-eslint',
  plugins: ['babel', 'prettier'],
  rules: {
    'babel/new-cap': 'warn',
    curly: ['error', 'all'],
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'error',
    'no-use-before-define': 'off',
    'one-var': ['error', {uninitialized: 'always', initialized: 'never'}],
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'one-var-declaration-per-line': 'off',
    'prefer-destructuring': ['off', {object: true, array: false}],
    'padding-line-between-statements': [
      'error',
      {blankLine: 'always', prev: '*', next: 'return'},
      {blankLine: 'always', prev: '*', next: 'function'},
    ],
    'spaced-comment': ['error', 'always'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        mjs: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ios.js',
          '.android.js',
          '.ts',
          '.tsx',
          '.json',
        ],
      },
    },
  },
};
