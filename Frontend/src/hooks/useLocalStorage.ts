import { UserDataResponse } from 'interfaces';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type SetValueState<T> = Dispatch<SetStateAction<T>>;

export const useLocalStorage = (
  key: string,
  initialValue: UserDataResponse
): [UserDataResponse, SetValueState<UserDataResponse>] => {
  try {
    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;

    const [value, setValue] = useState<UserDataResponse>(initial);

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
  } catch (error) {
    console.error('Error parsing JSON from localStorage:', error);
    throw new Error('Error parsing JSON from localStorage');
  }
};
