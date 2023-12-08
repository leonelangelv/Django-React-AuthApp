import { BASE_URL } from '@constant/index';

interface UserUpdateData {
  user_id: number;
  name: string;
  lastname: string;
  password: string;
  repeat_password: string;
  country: string;
  province: string;
}

interface UserUpdateRequest {
  ok: boolean;
  message: string;
}

export const userUpdateRequest = async (
  token: string,
  userData: UserUpdateData
): Promise<UserUpdateRequest> => {
  try {
    const res = await fetch(`${BASE_URL}/auth/update-user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(userData)
    });

    return await res.json();
  } catch (error) {
    console.error('Error in userUpdateRequest: ', error);
    throw new Error('Error during request for update user');
  }
};
