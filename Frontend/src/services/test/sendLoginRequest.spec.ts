import { sendLoginRequest } from '../sendLoginRequest';
import { BASE_URL } from '@constant/.';

global.fetch = jest.fn();

describe('Given the sendLoginRequest service', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  test('Should send the user data and return response whit userId and access_token', async () => {
    const userData = { username: 'test', password: 'test' };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          ok: true,
          userId: 3,
          access_token: 'abc123',
          message: ''
        })
    });
    const response = await sendLoginRequest(userData);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    expect(response).toEqual({
      ok: true,
      userId: 3,
      access_token: 'abc123',
      message: ''
    });
  });
});
