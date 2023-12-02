import { BASE_URL } from '@constant/index';

interface AccessTokenResponse {
  ok: boolean;
  message: string;
}

export const accessTokenRequest = async (
  token: string
): Promise<AccessTokenResponse | undefined> => {
  try {
    const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    });

    return await res.json();
  } catch (error) {
    console.error(`Error in accessTokenRequest: ${error}`);
  }
};
