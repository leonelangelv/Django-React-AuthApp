import { useEffect, useState } from 'react';
import { LoginResponse } from '@services/sendLoginRequest';
import { ReactNode, createContext } from 'react';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { USER_KEY } from '@constant/index';

interface UserContextProps {
  userData: LoginResponse | null;
  updateUser: (data: any) => void;
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<LoginResponse | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const [savedUser, saveUser] = useLocalStorage(USER_KEY, userData);

  useEffect(() => {
    if (!initialized && savedUser) {
      setUserData(savedUser);
      setInitialized(true);
    }
  }, [initialized, savedUser]);

  useEffect(() => {
    saveUser(userData);

    if (userData?.ok) setAuthenticated(true);
  }, [userData, saveUser, authenticated]);

  const updateUser = (userData: any) => {
    setUserData(userData);
  };

  const values: UserContextProps = {
    userData,
    updateUser,
    authenticated,
    setAuthenticated
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
