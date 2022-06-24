import { makeRequest } from 'api/makeRequest';

export const getCompletedTasksRequest = () => {
  return makeRequest({
    url: '/tasks?isDone=true',
    method: 'GET',
    headers: {
      accesstoken: true,
    },
  });
};
