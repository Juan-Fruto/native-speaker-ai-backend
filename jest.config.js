/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "./gitignore",
    "./Dockerfile",
  ],
  setupFiles: [
    './tests/setupTests.ts'
  ],
  globalSetup: "C:/Users/juan_/OneDrive/Desktop/Node JS/native-speaker-ai/backend/node_modules/@databases/mysql-test/jest/globalSetup",
  globalTeardown: "C:/Users/juan_/OneDrive/Desktop/Node JS/native-speaker-ai/backend/node_modules/@databases/mysql-test/jest/globalTeardown",
};