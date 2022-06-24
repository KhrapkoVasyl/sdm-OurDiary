import { makeRequest } from 'api/makeRequest';

export const toggleTaskRequest = (id) => {
  return makeRequest({
    url: `/tasks/toggle/${id}`,
    method: 'PATCH',
    headers: {
      accesstoken: true,
    },
  });
};
