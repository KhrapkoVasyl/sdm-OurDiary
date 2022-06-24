import { makeRequest } from 'api/makeRequest';

export const signUpRequest = ({ login, password }) => {
  return makeRequest({
    url: '/auth/signup',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {
      login,
      password,
    },
  });
};
