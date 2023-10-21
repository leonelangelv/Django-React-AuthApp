import { Routes, Route } from 'react-router-dom';
import { Login } from '@pages/log-in';
import { Signup } from '@pages/sign-up';

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<h1>Formulario</h1>} />
      <Route path='profile' element={<h1>Profile</h1>} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='passwordrecovery' element={<h1>Password recovery</h1>} />
    </Routes>
  );
};
