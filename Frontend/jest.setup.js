// import '@testing-library/jest-dom/extend-expect';
require('dotenv').config({ path: '.env' });

jest.mock('./src/constant/index', () => ({
  getEnviroments: () => ({ ...process.env })
}));

