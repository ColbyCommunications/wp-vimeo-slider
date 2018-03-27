module.exports = {
  parser: 'babel-eslint',
  env: { browser: true, es6: true },
  extends: ['airbnb'],
  rules: {
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': 0,
  },
  globals: {
    wp: true,
  },
};
