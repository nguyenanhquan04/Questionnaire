import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:8080/', // Adjust the base URL as needed
});

export default request;