import axios from 'axios';

// Endpoint URLs
const API_URL = "http://localhost:5000/api/auth"; // Replace with actual URL

// Login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token, user } = response.data;

    // Store token and user details in localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { success: true, token, user };
  } catch (err) {
    console.error('Login failed', err);
    return { success: false, error: err.response?.data?.message || 'Login failed' };
  }
};

// Register
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return { success: true, message: 'User registered successfully' };
  } catch (err) {
    console.error('Registration failed', err);
    return { success: false, error: err.response?.data?.message || 'Registration failed' };
  }
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

// Get current logged-in user
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return token ? true : false;
};
