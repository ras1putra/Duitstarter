import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

api.defaults.withCredentials = true;

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await api.post('/auth/refresh-token', {}, {
          withCredentials: true
        });

        if (refreshResponse.status === 200) {
          // Retry original request
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Unable to refresh token:', refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
