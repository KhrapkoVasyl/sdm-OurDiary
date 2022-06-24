import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from 'constants/routes';
import { selectIsAuth } from 'features/auth/authSlice';

const PublicRoute = ({ children, restricted = false }) => {
  const location = useLocation();
  const isAuth = useSelector(selectIsAuth);
  const from = location.state?.from?.pathname || ROUTES.MAIN;

  return isAuth && restricted ? <Navigate to={from} replace /> : children;
};

export default PublicRoute;
