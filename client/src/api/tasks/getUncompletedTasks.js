import { makeRequest } from 'api/makeRequest';

export const getUncompletedTasksRequest = () => {
  return makeRequest({
    url: '/tasks?isDone=false',
    method: 'GET',
    headers: {
      accesstoken: true,
    },
  });
};
