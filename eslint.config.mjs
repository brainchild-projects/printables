import { defineConfig, globalIgnores } from 'eslint/config';
import bestPractices from './eslint-best-practices.mjs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { fixupPluginRules } from '@eslint/compat';
// import { FlatCompat } from '@eslint/eslintrc';

import globals from 'globals';

import cypress from 'eslint-plugin-cypress';
import promiseModule from 'eslint-plugin-promise';
import { importX } from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import react from '@eslint-react/eslint-plugin';
import sonarjs from 'eslint-plugin-sonarjs';
// eslint-disable-next-line import-x/namespace, import-x/default -- TODO: import-x has a problem parsing the exports
import stylistic from '@stylistic/eslint-plugin';
import vitest from '@vitest/eslint-plugin';
import testingLibrary from 'eslint-plugin-testing-library';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const compat = new FlatCompat({
//   baseDirectory: __dirname,
//   recommendedConfig: js.configs.recommended,
//   allConfig: js.configs.all
// });

const promise = promiseModule.configs['flat/recommended'];

const config = defineConfig([
  {
    files: [
      '**/*.js',
      '**/*.mjs',
      '**/*.ts',
      '**/*.tsx',
    ],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    extends: [
      js.configs.recommended,
      promise,
      importX.flatConfigs.recommended,
    ],

    plugins: {
      sonarjs,
      '@stylistic': stylistic,
      // promise: promiseModule,
      // promise: promise.plugins.promise,
    },

    rules: {
      ...bestPractices,
      // "eslint-comments/disable-enable-pair": ["error", {
      //     allowWholeFile: true,
      // }],

      'no-console': 'error',
      'no-underscore-dangle': 'error',
      'no-void': 'off',
      'no-restricted-syntax': 'off',
      'no-param-reassign': ['error', { props: true }],

      'no-plusplus': ['error', {
        allowForLoopAfterthoughts: true,
      }],

      'promise/no-nesting': 'error',
      'sonarjs/cognitive-complexity': ['error', 5],

      complexity: ['error', {
        max: 7,
      }],

      // quotes: ['error', 'single', {
      //   allowTemplateLiterals: true,
      // }],

      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single', {
        allowTemplateLiterals: 'avoidEscape',
        avoidEscape: true,
      }],
    },
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  globalIgnores([
    'build/**/*', 'coverage/**/*', 'dist/**/*',
    '.husky/**/*', '.devenv/**/*',
  ]),
  {
    files: ['**/*.ts', '**/*.tsx'],

    extends: [
      tseslint.configs['flat/recommended'],
      react.configs['recommended-typescript'],
      importX.flatConfigs.typescript,
    ],

    plugins: {
      '@typescript-eslint': tseslint,
    },

    settings: {
      'import/resolver': {
        typescript: createTypeScriptImportResolver(),
      },
    },

    languageOptions: {
      parser: tsParser,

      parserOptions: {
        projectService: true,
        ecmaVersion: 'latest',
        sourceType: 'module',
        // project: "./tsconfig.json",
      },
    },

    rules: {
      'no-void': 'off',

      '@stylistic/type-annotation-spacing': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
    },
  },
  {
    files: [
      'src/**/*.js',
      'src/**/*.ts',
      'src/**/*.tsx',
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: [
      'src/**/*.spec.ts',
      'src/**/*.spec.tsx',
    ],
    ...testingLibrary.configs['flat/recommended'],
    ...testingLibrary.configs['flat/react'],

    plugins: {
      vitest,
      'testing-library': testingLibrary,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/valid-title': [
        'error',
        { allowArguments: true },
      ],
      'testing-library/no-render-in-lifecycle': ['error', {
        allowTestingFrameworkSetupHook: 'beforeEach',
      }],
    }
  },
  {
    files: [
      'cypress/**/*.cy.ts',
      'cypress/support/commands.ts',
    ],
    ...cypress.configs.recommended,
  }
]);

export default config;
