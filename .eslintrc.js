module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  root: true,
  rules: {
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    'no-void': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/prevent-abbreviations': ['error', {
      checkFilenames: false,
    }],
  },
  overrides: [
    {
      files: '**/*.+(ts|tsx)',
      extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      plugins: [
        'react',
        '@typescript-eslint',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'no-void': 'off',
        '@typescript-eslint/type-annotation-spacing': 'error',
      },
    },
    {
      files: './*.js',
      rules: {
        'unicorn/prefer-module': 'off',
      },
    },
  ],
};
