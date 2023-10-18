import { Routes, Route } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='profile' element={<h1>Profile</h1>} />
      <Route path='login' element={<h1>Log in</h1>} />
      <Route path='singup' element={<h1>Sing up</h1>} />
      <Route path='passwordrecovery' element={<h1>Password recovery</h1>} />
    </Routes>
  );
};
