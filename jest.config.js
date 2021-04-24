module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      diagnostics: false,
      compiler: "ttypescript",
    },
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 95,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ["text-summary", "lcov"],
  setupFilesAfterEnv: ["jest-extended"],
  setupFiles: ["<rootDir>/config.test.d.ts"],
  testMatch: ["**/*.test.ts"],
};
