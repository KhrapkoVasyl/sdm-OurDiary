import { makeRequest } from 'api/makeRequest';

export const getAllTasksRequest = () => {
  return makeRequest({
    url: '/tasks',
    method: 'GET',
    headers: {
      accesstoken: true,
    },
  });
};
