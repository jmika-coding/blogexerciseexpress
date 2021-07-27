/**
 * The "eslint-config-react-app" depends on an unnecessary dependency
 * for this project: "eslint-plugin-flow".
 *
 * However, "eslint-config-react-app" offers sensible defaults that largely outweights
 * the costs of having this unnecessary dependency.
 */

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module",
  },
  ignorePatterns: ["src/generated/**/*.ts"],
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/eslint-recommended"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/adjacent-overload-signatures": "warn",
        "@typescript-eslint/array-type": [
          "warn",
          {
            default: "array-simple",
          },
        ],
        "@typescript-eslint/naming-convention": "warn",
        "@typescript-eslint/explicit-member-accessibility": 0,
        "@typescript-eslint/no-empty-interface": "warn",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-non-null-assertion": "error",
        "no-unused-vars": "off",
        "@typescript-eslint/restrict-plus-operands": "error",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            vars: "all",
            args: "all",
            ignoreRestSiblings: false,
            argsIgnorePattern: "^_",
            caughtErrors: "all",
            caughtErrorsIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/no-use-before-define": [
          "error",
          { functions: false, classes: true, variables: false, typedefs: true },
        ],
        "@typescript-eslint/no-useless-constructor": "warn",
      },
    },
  ],
}
