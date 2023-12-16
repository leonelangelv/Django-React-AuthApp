import { BASE_URL } from '@constant/index';
import { CheckRecoveryData } from '@pages/password-recovery/components/enter-code-card';
import { SendRecoveryDataRequestResponse } from 'interfaces/services/recoveryData';

export const checkRecoveryCodeRequest = async (
  data: CheckRecoveryData
): Promise<SendRecoveryDataRequestResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/check-recovery-password`, {
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
