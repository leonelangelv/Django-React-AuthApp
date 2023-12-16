import { BASE_URL } from '@constant/index';
import { SendRecoveryData } from '@pages/password-recovery/components/recovery-data-card';
import { SendRecoveryDataRequestResponse } from 'interfaces/services/recoveryData';

export const sendRecoveryDataRequest = async (
  data: SendRecoveryData
): Promise<SendRecoveryDataRequestResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/recovery-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return await res.json();
  } catch (error) {
    console.error('Error in sendRecoveryDataRequest: ', error);
    throw new Error('Error during request for send recovery data');
  }
};
