module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    // See 'recommended configuration':
    // https://prettier.io/docs/en/integrating-with-linters.html
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  rules: {
    // Next two rules prevent false positives on imported types.
    // See https://stackoverflow.com/questions/55280555/typescript-eslint-eslint-plugin-error-route-is-defined-but-never-used-no-un
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // To make eslint accept single quotes as apostrophes,
    // See https://github.com/yannickcr/eslint-plugin-react/issues/894#issuecomment-419250585
    'react/no-unescaped-entities': 0,
  },
  // From https://github.com/yannickcr/eslint-plugin-react#configuration
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: 'detect',
      flowVersion: '0.53',
    },
    propWrapperFunctions: [
      'forbidExtraProps',
      { property: 'freeze', object: 'Object' },
      { property: 'myFavoriteWrapper' },
    ],
    linkComponents: ['Hyperlink', { name: 'Link', linkAttribute: 'to' }],
  },
};
