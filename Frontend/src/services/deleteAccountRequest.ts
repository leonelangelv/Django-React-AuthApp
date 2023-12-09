import { BASE_URL } from '@constant/index';

interface UserDataDelete {
  userId: number;
  password: string;
}

interface DeleteAccountResponse {
  ok: boolean;
  message: string;
}

export const deleteAccountRequest = async (
  token: string,
  userData: UserDataDelete
): Promise<DeleteAccountResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/delete-user`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(userData)
    });

    return await response.json();
  } catch (error) {
    console.error('Error in deleteAccountRequest: ', error);
    throw new Error('Error during request for delete account');
  }
};
