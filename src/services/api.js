// api.js
import axios from 'axios';

//  Use environment variable for production deployment
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
