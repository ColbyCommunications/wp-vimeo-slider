module.exports = {
  testMatch: ['**/?(*.)(spec|test).js?(x)'],
  collectCoverage: true,
  collectCoverageFrom: ['src/js/**/*.js'],
  setupFiles: ['./src/js/__tests__/setup.js'],
};
