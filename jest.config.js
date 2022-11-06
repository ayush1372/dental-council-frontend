const config = {
  verbose: true,
};

module.exports = config;

module.exports = async () => {
  return {
    verbose: true,
  };
};

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: './output/code-coverage',
  testEnvironment: 'jsdom',
  testTimeout: 200,
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 50,
      statements: 70,
    },
  },
};
