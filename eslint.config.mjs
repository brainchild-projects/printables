import path from "path";
import { fileURLToPath } from "url";
import {
    defineConfig,
    globalIgnores,
} from "eslint/config";

import globals from "globals";

import {
    fixupConfigRules,
    fixupPluginRules,
} from "@eslint/compat";

import react from "@eslint-react/eslint-plugin"; //
import sonarjs from "eslint-plugin-sonarjs"; //
import cypress from "eslint-plugin-cypress"; //
import typescriptEslint from "@typescript-eslint/eslint-plugin"; //
import tsParser from "@typescript-eslint/parser"; //
import testingLibrary from "eslint-plugin-testing-library"; //
import js from "@eslint/js";

import { FlatCompat } from "@eslint/eslintrc";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    languageOptions: {
        globals: {
            ...globals.browser,
        },

        ecmaVersion: 12,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    extends: fixupConfigRules(compat.extends(
        // "react-app",
        // "plugin:react/recommended",
        // "plugin:react-hooks/recommended",
        // "plugin:eslint-comments/recommended",
        // "plugin:promise/recommended",
        // "airbnb",
        "prettier",
    )),

    plugins: {
        react: fixupPluginRules(react),
        sonarjs,
        cypress,
    },

    rules: {
        // "eslint-comments/disable-enable-pair": ["error", {
        //     allowWholeFile: true,
        // }],

        "no-void": "off",
        "no-restricted-syntax": "off",

        "no-plusplus": ["error", {
            allowForLoopAfterthoughts: true,
        }],

        "sonarjs/cognitive-complexity": ["error", 5],

        complexity: ["error", {
            max: 5,
        }],

        quotes: ["error", "single", {
            allowTemplateLiterals: true,
        }],
    },
}, globalIgnores(["build/**/*", "coverage/**/*", "dist/**/*"]), {
    files: ["**/*.+(ts|tsx)"],

    extends: compat.extends(
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ),

    plugins: {
        react: fixupPluginRules(react),
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        parser: tsParser,

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    rules: {
        "no-void": "off",
        // "@typescript-eslint/type-annotation-spacing": "error",
    },
}, {
    files: ["src/**/*.spec.+(ts|tsx)"],
    ...testingLibrary.configs["recommended"],
    ...testingLibrary.configs["flat/react"],

    // plugins: {
    //     "testing-library": testingLibrary,
    // },

    // extends: compat.extends("plugin:testing-library/react"),

    // rules: {
    //     "testing-library/no-render-in-setup": ["error", {
    //         allowTestingFrameworkSetupHook: "beforeEach",
    //     }],
    // },
}, {
    files: ["**/vite.config.ts"],

    rules: {
        "import/no-extraneous-dependencies": "off",
    },
}, {
    files: [
        "**/*.spec.ts",
        "**/*.spec.tsx",
        "src/testing/**/*.ts",
        "src/testing/**/*.tsx",
        "**/vitest.setup.ts",
    ],

    rules: {
        "import/no-extraneous-dependencies": "off",
    },
}, {
    files: ["src/stories/**/*.+(ts|tsx)"],

    rules: {
        "import/no-extraneous-dependencies": "off",
        "react/jsx-props-no-spreading": "off",
        "import/no-anonymous-default-export": "off",
    },
}, {
    files: ["cypress/**/*", "scripts/**/*"],

    rules: {
        "import/no-extraneous-dependencies": "off",
        "import/extensions": "off",
    },

    // extends: compat.extends("plugin:cypress/recommended"),
}, {
    files: ["cypress/**/*.+(ts|tsx)"],

    // extends: compat.extends(
    //     "airbnb-typescript",
    //     "airbnb/hooks",
    //     "plugin:@typescript-eslint/recommended",
    //     "plugin:@typescript-eslint/recommended-requiring-type-checking",
    // ),

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        parser: tsParser,

        parserOptions: {
            project: "./cypress/tsconfig.json",
        },
    },

    rules: {
        "no-void": "off",
        "no-restricted-syntax": "off",
        "import/no-extraneous-dependencies": "off",
        "promise/always-return": "off",
        "@typescript-eslint/no-unused-expressions": "off",
    },
}, {
    files: ["scripts/**/*.ts"],

    // extends: compat.extends(
    //     "airbnb-typescript",
    //     "plugin:@typescript-eslint/recommended",
    //     "plugin:@typescript-eslint/recommended-requiring-type-checking",
    // ),

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        parser: tsParser,

        parserOptions: {
            project: "./scripts/tsconfig.json",
        },
    },

    rules: {
        "import/no-extraneous-dependencies": "off",
    },
}, {
    files: ["./*.js"],
}]);
