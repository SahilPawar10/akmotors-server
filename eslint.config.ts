// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    plugins: {
      prettier,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      /* ✅ Prettier */
      "prettier/prettier": "error",

      /* ✅ TypeScript strictness */
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "warn",
      // 🚨 Enforce explicit typing everywhere
      "@typescript-eslint/typedef": [
        "error",
        {
          // arrayDestructuring: true,
          arrowParameter: false,
          objectDestructuring: false, // disable forcing type annotations for destructuring
          // memberVariableDeclaration: false,
          parameter: true,
          // propertyDeclaration: false,
          // variableDeclaration: true,
          variableDeclarationIgnoreFunction: true,
        },
      ],

      /* ✅ General best practices */
      eqeqeq: ["error", "always"],
      "no-console": "warn",
      "no-debugger": "error",
      "no-var": "error",
      "prefer-const": "error",
      "no-duplicate-imports": "error",
      curly: ["error", "all"],
      "arrow-body-style": ["error", "as-needed"],
      "prefer-template": "error",
      "object-shorthand": "error",
      "no-unused-expressions": "error",
    },
  },
]);
