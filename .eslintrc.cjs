/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')
const createAliasSetting = require('@vue/eslint-config-airbnb-with-typescript/createAliasSetting')
const path = require('path')

module.exports = {
  root: true,
  plugins: ['prettier'],
  'extends': [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb-with-typescript',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    project: path.join(__dirname, './tsconfig.eslint.json'),
  },
  rules: {
    'prettier/prettier': ['error'],
    'import/no-extraneous-dependencies': ['off'],
  },
  settings: {
    ...createAliasSetting([path.join(__dirname, './tsconfig.eslint.json')])
  }
}
