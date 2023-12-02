import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Login } from '@pages/log-in';
import { Signup } from '@pages/sign-up';
import { UserProfile } from '@pages/user-profile';
import { PasswordRecovery } from '@pages/password-recovery';
import { ProtectedRoute } from './ProtectedRoute';
import { UserContext } from '@contexts/UserContext';
import { accessTokenRequest } from '@services/accessTokenRequest';

export const AppRouter = () => {
  const { userData, authenticated, setAuthenticated } =
    useContext(UserContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (userData?.access_token) {
        const isValidToken = await accessTokenRequest(userData.access_token);
        if (isValidToken?.ok) {
          setAuthenticated(true);
          navigate('/profile');
        }
      }
    })();
  }, [userData?.access_token]);
  
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='login' element={<Login />} />
      <Route path='password-recovery' element={<PasswordRecovery />} />

      <Route element={<ProtectedRoute user={authenticated} />}>
        <Route path='profile' element={<UserProfile />} />
      </Route>
    </Routes>
  );
};
