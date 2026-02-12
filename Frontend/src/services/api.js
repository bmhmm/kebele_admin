// // src/services/api.js
// export default {
//     get: async (url) => {
//         const API_URL = 'http://localhost:5000/api'; // Your Node.js backend
//         const response = await fetch(`${API_URL}${url}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // 'Authorization': `Bearer ${localStorage.getItem('token')}`
//             },
//         });
        
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         return response.json();
//     },
    
//     post: async (url, data) => {
//         const API_URL = 'http://localhost:5000/api';
//         const response = await fetch(`${API_URL}${url}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // 'Authorization': `Bearer ${localStorage.getItem('token')}`
//             },
//             body: JSON.stringify(data),
//         });
        
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         return response.json();
//     }
// };




import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('kebele_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('kebele_token');
      localStorage.removeItem('kebele_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;