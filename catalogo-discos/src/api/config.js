import axios from 'axios';

// Configure access to backend API
const http = axios.create({
  baseURL: 'http://localhost:6001/',
});

export default http;
