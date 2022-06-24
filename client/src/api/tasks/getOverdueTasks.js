import { makeRequest } from 'api/makeRequest';

export const getOverdueTasksRequest = () => {
  return makeRequest({
    url: '/tasks?isDone=false&overdue=true',
    method: 'GET',
    headers: {
      accesstoken: true,
    },
  });
};
