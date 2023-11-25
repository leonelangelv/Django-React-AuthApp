import { Routes, Route } from 'react-router-dom';
import { Login } from '@pages/log-in';
import { Signup } from '@pages/sign-up';
import { UserProfile } from '@pages/user-profile';
import { PasswordRecovery } from '@pages/password-recovery';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRouter = () => {
  const user = true;

  return (
    <Routes>
      <Route index element={<Signup />} />
      <Route path='signup' element={<Signup />} />
      <Route path='login' element={<Login />} />
      <Route path='password-recovery' element={<PasswordRecovery />} />
      
      <Route element={<ProtectedRoute user={user} />}>
        <Route path='profile' element={<UserProfile />} />
      </Route>
    </Routes>
  );
};
