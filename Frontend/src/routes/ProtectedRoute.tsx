import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  user: any;
  redirectTo?: string;
}

export const ProtectedRoute: FC<Props> = ({ user, redirectTo = '/signup' }) => {
  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};
