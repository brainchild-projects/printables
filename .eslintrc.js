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
    'no-restricted-syntax': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
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
      files: 'src/stories/**/*.+(ts|tsx)',
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'react/jsx-props-no-spreading': 'off',
        'import/no-anonymous-default-export': 'off',
      },
    },
    {
      files: ['cypress/**/*', 'scripts/**/*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
      extends: [
        'plugin:cypress/recommended',
      ],
    },
    {
      files: 'cypress/**/*.+(ts|tsx)',
      extends: [
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
      rules: {
        'no-void': 'off',
        'no-restricted-syntax': 'off',
        'import/no-extraneous-dependencies': 'off',
        'promise/always-return': 'off',
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
    },
  ],

};
