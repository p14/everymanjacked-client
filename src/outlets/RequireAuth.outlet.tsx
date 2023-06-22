import { Navigate, Outlet } from 'react-router-dom';
import { useSessionContext } from '../context/session.context';

const RequireAuth = () => {

  const { isLoggedIn } = useSessionContext();

  if (!isLoggedIn) {
    return (
      <Navigate to='/login' />
    );
  }

  return (
    <Outlet />
  );
}

export default RequireAuth;
