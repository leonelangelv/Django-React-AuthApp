import { BASE_URL } from '@constant/index';
import { ResponseError, UserDataResponse } from 'interfaces';

interface Values {
  name: string;
  lastname: string;
  password: string;
  repetPassword: string;
}

interface UserData {
  user: Values;
}

export const signupRequest = async (
  userData: UserData
): Promise<UserDataResponse | ResponseError> => {
  try {
    const res = await fetch(`${BASE_URL}/auth/singup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    return await res.json();
  } catch (error) {
    console.error(`Error in signupRequest: ${error}`);
    throw new Error('Error occurred during signup request');
  }
};
