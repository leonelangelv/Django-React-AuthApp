import { BASE_URL } from '@constant/index';

export interface Provinces {
  name: string;
}

export interface CountryWithProvinces {
  name: string;
  provinces: Provinces[];
}

export interface CountryWithoutProvinces {
  name: string;
}

export interface GeodataWithProvinces {
  countries: CountryWithProvinces;
}

export interface GeodataWithoutProvinces {
  countries: CountryWithoutProvinces[];
}

export const geodataRequest = async (
  token: string,
  country?: string
): Promise<GeodataWithProvinces | GeodataWithoutProvinces> => {
  try {
    let url = '';
    !country
      ? (url = `${BASE_URL}/geo-api`)
      : (url = `${BASE_URL}/geo-api/${country}`);

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    });

    return await res.json();
  } catch (error) {
    console.error(`Error in geodataRequest: ${error}`);
    throw new Error('Error occurred during geodata request');
  }
};
