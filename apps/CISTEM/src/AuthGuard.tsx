import { useSession } from '@session';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const location = useLocation();
  const { session, isLoading } = useSession();

  if (isLoading) {
    return (
        <div className="flex flex-col justify-center items-center h-full">
            <h1 className="mb-4 text-2xl">Loading session...</h1>
        </div>
    );
  }

  if (!session && !isLoading) return <Navigate to="/login" state={{ from: location }} replace />;

  return <>{children}</>;
};

export default AuthGuard;
