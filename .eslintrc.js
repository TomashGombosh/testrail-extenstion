module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "standard",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  globals: {
    eslint: true,
    expect: true,
    test: true,
    describe: true,
    xdescribe: true,
    jest: true,
    process: true,
    global: true,
    afterEach: true,
    beforeEach: true,
    beforeAll: true,
    module: true,
    __dirname: true,
    chrome: true,
  },
  plugins: [
    "react",
    "@typescript-eslint",
  ],
  rules: {
    "no-magic-numbers": ["error", { ignore: [-1, 0, 1, 2, 3, 4, 5] }],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "space-before-function-paren": ["error", "always"],
    "comma-dangle": ["error", {
      arrays: "always-multiline",
      objects: "always-multiline",
      imports: "always-multiline",
      exports: "never",
      functions: "never",
    }],
    "import/extensions": ["off"],
    "import/no-unresolved": ["off"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
