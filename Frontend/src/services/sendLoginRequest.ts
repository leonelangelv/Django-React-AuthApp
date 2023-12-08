import { BASE_URL } from '@constant/.';
import { ResponseError, UserDataResponse } from 'interfaces';
import { UserData } from 'interfaces/pages/log-in';

export const sendLoginRequest = async (
  userData: UserData
): Promise<UserDataResponse | ResponseError> => {
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
    throw new Error('Error occurred during login request');
  }
};
