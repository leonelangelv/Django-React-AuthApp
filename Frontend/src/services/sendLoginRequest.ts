import { BASE_URL } from '@constant/.';
import { UserData } from 'interfaces/pages/log-in';

export interface LoginResponse {
  ok: boolean;
  userId?: number;
  access_token?: string;
  message: string;
}

export const sendLoginRequest = async (
  userData: UserData
): Promise<LoginResponse | undefined> => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    return await res.json();
  } catch (error) {
    console.error(`Error in sendLoginRequest: ${error}`);
  }
};
