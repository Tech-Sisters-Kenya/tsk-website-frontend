import { baseURL } from './constants';
import axios from 'axios';

/* creating a pre-configured HTTP client/ custom config to reuse in the app using axios.create({}) instead of global defaults so that we have axiosInstance.get('/blogs) */

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});
