import { getToken } from './config';
import axios from 'axios';

export const makeRequest = ({
  url = '/',
  method = 'GET',
  headers = {},
  params = {},
  data = {},
}) => {
  const prefix = '/api/v1';
  const fetchURL = prefix + url;

  if (headers && headers.accesstoken) {
    headers.accesstoken = getToken();
  }

  return axios(fetchURL, { method, headers, data, params });
};
