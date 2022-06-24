import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from 'constants/routes';
import { selectIsAuth } from 'features/auth/authSlice';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? (
    children
  ) : (
    <Navigate to={ROUTES.SIGN_IN} replace state={{ from: location }} />
  );
};

export default PrivateRoute;
