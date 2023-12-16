import { IMGBB_KEY, IMGBB_URL } from '@constant/index';

export const saveImageRequest = async (name: string, image: any) => {
  try {
    const formData = new FormData();
    formData.append('image', image);

    const res = await fetch(
      `${IMGBB_URL}?expiration=60&key=${IMGBB_KEY}&name=${name}`,
      {
        method: 'POST',
        body: formData
      }
    );

    return await res.json();
  } catch (error) {
    console.error('Error in saveImageRequest: ', error);
    throw new Error('Error during request for save image');
  }
};
