module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'standard',
    'standard-react',
    'prettier',
    // 'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  // parser: 'babel-eslint',
  parserOptions: {
    project: 'tsconfig.default.json',
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {},
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',

    'react/display-name': 0,
    'react/prop-types': 0,
    camelcase: 0,
    eqeqeq: 0,
    'max-len': ['error', 120],
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': ['error', 'never'],
    // 'object-curly-spacing': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'no-console': 0,
    'react/jsx-no-bind': 0,

    '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],

    // '@typescript-eslint/quotes': [
    //   'error',
    //   'single',
    // ],
    // '@typescript-eslint/indent': [
    //   'error',
    //   2,
    // ],
  },
}
