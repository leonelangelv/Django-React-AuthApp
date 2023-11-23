import { BASE_URL } from '@constant/.';
import { UserData } from 'interfaces/pages/log-in';

export const sendLoginRequest = async (userData: UserData) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    console.log(await res.json());
    return await res.json();
  } catch (error) {
    console.error(`Error in sendLoginRequest: ${error}`);
  }
};
