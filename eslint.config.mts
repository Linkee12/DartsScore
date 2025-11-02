// @ts-nocheck
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";
import sonarjs from "eslint-plugin-sonarjs";
import promise from "eslint-plugin-promise";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,cts,mts,jsx,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    settings: {
      react: { version: "detect" },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: reactPlugin,
      prettier: prettierPlugin,
      sonarjs,
      promise,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...reactPlugin.configs.flat.recommended.rules,
      ...sonarjs.configs["recommended-legacy"]?.rules,
      ...promise.configs.recommended?.rules,

      "prettier/prettier": ["error", {}, { usePrettierrc: true }],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "promise/catch-or-return": "off",
      "promise/always-return": "off",
    },
  },
]);
