// src/api/userAPI.js
import axios from 'axios';

const API_URL = 'https://66beb5fb42533c403143d766.mockapi.io/question/user';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
