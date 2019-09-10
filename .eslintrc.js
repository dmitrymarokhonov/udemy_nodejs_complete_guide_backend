module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-underscore-dangle": "off",
    "no-console": "off",
    "no-unused-vars": "off",
    "global-require": "off",
    "comma-dangle": "off"
  },
};
