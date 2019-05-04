
module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  preset: 'ts-jest',
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/**"
  ],
  testMatch: [
    "**/test/**/*.test.ts",
  ]
};
