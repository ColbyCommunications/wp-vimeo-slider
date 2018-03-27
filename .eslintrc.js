module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  plugins: ['jest'],
  env: { browser: true, es6: true, 'jest/globals': true },
  rules: {
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': 0,
  },
  globals: {
    wp: true,
  },
};
