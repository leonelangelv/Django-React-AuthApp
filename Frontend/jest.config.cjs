module.exports = {
  preset: 'ts-jest',
  // testEnvironment: 'jest-environment-jsdom',
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.setup.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    // '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.module\\.css$': 'identity-obj-proxy',

    // Alias for test
    '^@assets/(.*)': '<rootDir>/src/assets/$1',
    '^@components/(.*)': '<rootDir>/src/components/$1',
    '^@constant/(.*)': '<rootDir>/src/constant/$1',
    '^@helpers/(.*)': '<rootDir>/src/helpers/$1'
  }
};

/***
 * por si se usa fetch api
 * npm  i -D whatwg-fetch
 *
 * en jest.setup
 * import 'whatwg-fetch';
 */
