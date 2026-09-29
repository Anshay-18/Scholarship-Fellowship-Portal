import axios from 'axios';

// Base Axios client configured for future Spring Boot 3.x REST API integration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Platform': 'MoTA-Scholarship-Web-Portal'
  },
  timeout: 15000
});

// Request interceptor for attaching JWT Bearer tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('mota_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized session. Role authentication token required.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
