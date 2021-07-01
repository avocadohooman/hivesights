module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    "<rootDir>/server/cypress/",
    "<rootDir>/server/tests/populateCompany.test.ts"],
};