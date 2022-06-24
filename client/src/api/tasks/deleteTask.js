import { makeRequest } from 'api/makeRequest';

export const deleteTaskRequest = (id) => {
  return makeRequest({
    url: `/tasks/${id}`,
    method: 'DELETE',
    headers: {
      accesstoken: true,
    },
  });
};
