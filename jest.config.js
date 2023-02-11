module.exports = {
  roots: ['<rootDir>/src/', '<rootDir>/.storybook/'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  testRegex: '.*\\.(test|spec)\\.(ts|js|tsx|jsx)$',
  modulePathIgnorePatterns: ['__e2e_tests__'],
  moduleNameMapper: {
    '\\.(svg|png)$': 'jest-transformer-svg',
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^config$': '<rootDir>/src/config/index.js',
    '^styles(.*)$': '<rootDir>/src/styles/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleDirectories: ['node_modules'],
  resetMocks: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  restoreMocks: true,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['src/*.{js,jsx,ts,tsx}', 'src/**/*.{js,jsx,ts,tsx}'],

  // The directory where Jest should output its coverage files
  coverageDirectory: './test/coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['/node_modules/', 'src/types/'],

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
};
