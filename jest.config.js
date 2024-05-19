// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      diagnostics: false
    }
  },
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1'
  }
}
