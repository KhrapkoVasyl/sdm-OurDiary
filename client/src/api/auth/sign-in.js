import { makeRequest } from 'api/makeRequest';

export const signInRequest = ({ login, password }) => {
  return makeRequest({
    url: '/auth/signin',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {
      login,
      password,
    },
  });
};
