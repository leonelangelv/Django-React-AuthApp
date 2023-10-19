import { Routes, Route } from 'react-router-dom';
import { LogIn } from '@pages/log-in';

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<h1>Formulario</h1>} />
      <Route path='profile' element={<h1>Profile</h1>} />
      <Route path='login' element={<LogIn />} />
      <Route path='singup' element={<h1>Sing up</h1>} />
      <Route path='passwordrecovery' element={<h1>Password recovery</h1>} />
    </Routes>
  );
};
