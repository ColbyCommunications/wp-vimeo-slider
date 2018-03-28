module.exports = {
  testMatch: ['**/?(*.)(spec|test).js?(x)'],
  testPathIgnorePatterns: ['setup.js'],
  collectCoverage: true,
  collectCoverageFrom: ['src/js/**/*.js'],
  coveragePathIgnorePatterns: ['setup.js'],
  setupFiles: ['./src/js/__tests__/setup.js'],
};
