import { Routes, Route } from 'react-router-dom';
import { Login } from '@pages/log-in';
import { Signup } from '@pages/sign-up';
import { UserProfile } from '@pages/user-profile';

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Signup />} />
      <Route path='profile' element={<UserProfile />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='password-recovery' element={<h1>Password recovery</h1>} />
    </Routes>
  );
};
