import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ isPrivate, children }) {
  const isAuthenticated = localStorage.getItem('accesstoken')
    ? isPrivate === 'PUBLIC'
      ? true
      : isPrivate
    : isPrivate === 'PUBLIC'
    ? true
    : !isPrivate;

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}

export default ProtectedRoute;
