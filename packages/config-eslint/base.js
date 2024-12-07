import eslintJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tsEslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  eslintJs.configs.recommended,
  ...tsEslint.configs.recommended,
  ...eslintPluginUnicorn.configs["flat/recommended"],
  {
    name: "turborepo",
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    name: "only-warn",
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**"],
  },
  eslintConfigPrettier,
];
