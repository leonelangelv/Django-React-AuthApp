import { BASE_URL } from '@constant/index';

export interface GetUserFlagResponse {
  ok: boolean;
  message: string;
  flag: string;
  name: string
}

export const getUserFlagRequest = async (
  country: string
): Promise<GetUserFlagResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/auth/flag/${country}`);
    return await res.json();
  } catch (error) {
    console.error('Error in getUserFlagRequest: ', error);
    throw new Error('Error during request for get user flag');
  }
};
