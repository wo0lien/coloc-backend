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
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  coverageReporters: ["text", "lcov"],
  setupFilesAfterEnv: ["jest-extended"],
  setupFiles: ["<rootDir>/config.test.d.ts"],
};
