let token = null;

export const setToken = (accessToken) => {
  token = accessToken;
};

export const getToken = () => {
  return token;
};
