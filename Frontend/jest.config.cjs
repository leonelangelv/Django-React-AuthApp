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
    '^@assets/(.*)': '<rootDir>/src/assets/$1'
  }
};

/***
 * por si se usa fetch api
 * npm  i -D whatwg-fetch
 *
 * en jest.setup
 * import 'whatwg-fetch';
 */