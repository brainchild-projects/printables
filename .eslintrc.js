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
    'cypress',
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
      files: 'src/**/*.spec.+(ts|tsx)',
      plugins: ['testing-library'],
      extends: [
        'plugin:jest/recommended',
        'plugin:testing-library/react',
      ],
    },
    {
      files: ['cypress/**/*', 'scripts/**/*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: 'cypress/**/*.+(ts|tsx)',
      extends: [
        'plugin:cypress/recommended',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      plugins: [
        '@typescript-eslint',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './cypress/tsconfig.json',
      },
    },
    {
      files: 'scripts/**/*.ts',
      extends: [
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      plugins: [
        '@typescript-eslint',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './scripts/tsconfig.json',
      },
      rules: {
        'import/no-extraneous-dependencies': 'off',
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
