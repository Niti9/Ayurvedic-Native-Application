import apiClient from './apiClient';

apiClient.interceptors.request.use(
  config => {
    console.log(
      `${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
    );
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.log('API Error', error?.response?.status);
    console.log('Error is', error?.response?.data);
    return Promise.reject(error);
  },
);

export default apiClient;
