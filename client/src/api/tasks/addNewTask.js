import { makeRequest } from 'api/makeRequest';

export const addNewTaskRequest = (task) => {
  return makeRequest({
    url: '/tasks',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', accesstoken: true },
    data: task,
  });
};
