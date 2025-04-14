export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const defaultHeaders = {
    'Authorization': `Bearer ${token}`,
  };

  // Don't add Content-Type for FormData
  if (!(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      throw new Error('Authentication failed. Please login again.');
    }
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }

  return response;
};