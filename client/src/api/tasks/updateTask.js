import { makeRequest } from 'api/makeRequest';

export const updateTaskRequest = (id, updatedTask) => {
  return makeRequest({
    url: `/tasks/${id}`,
    method: 'PATCH',
    headers: {
      accesstoken: true,
    },
    data: updatedTask,
  });
};
