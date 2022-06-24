import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setToken } from './config';

const APITokenHandler = () => {
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    setToken(token);
  }, [token]);

  return null;
};

export default APITokenHandler;
