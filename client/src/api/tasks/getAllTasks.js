import { makeRequest } from 'api/makeRequest';

export const getAllTasksRequest = (params) => {
  return makeRequest({
    url: '/tasks',
    method: 'GET',
    headers: {
      accesstoken: true,
    },
    params,
  });
};
