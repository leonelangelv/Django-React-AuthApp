import { BASE_URL } from '@constant/index';
import { SendRecoveryDataRequestResponse } from 'interfaces/services/recoveryData';

export interface ResetPasswordData {
  username: string;
  password: string;
  repeatPassword: string;
}

export const resetPasswordRequest = async (
  data: ResetPasswordData
): Promise<SendRecoveryDataRequestResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return await res.json();
  } catch (error) {
    console.error('Error in checkRecoveryCodeRequest: ', error);
    throw new Error('Error during request for check recovery code');
  }
};
