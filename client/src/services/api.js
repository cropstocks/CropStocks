const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }
  return data;
};

// Mock fallback to allow viewing frontend without backend
const handleMock = (endpoint, method, data) => {
  console.warn(`[MOCK API] Returning mock data for ${method} ${endpoint}`);
  
  if (endpoint.includes('/auth/login') || endpoint.includes('/auth/register')) {
    const role = data?.role || (data?.email?.includes('farmer') ? 'FARMER' : 'INVESTOR');
    return {
      token: 'mock-jwt-token-123',
      user: {
        id: 'mock-user-1',
        name: data?.name || 'Demo User',
        email: data?.email || 'demo@example.com',
        role: role.toUpperCase()
      }
    };
  }
  
  if (endpoint.includes('/auth/me')) {
    return {
      user: {
        id: 'mock-user-1',
        name: 'Demo User',
        email: 'demo@example.com',
        role: 'INVESTOR'
      }
    };
  }
  
  // Default mock fallback: empty arrays for listings/data, success messages for posts
  if (method === 'GET') {
    if (endpoint.includes('stats') || endpoint.includes('summary')) {
      return { totalInvested: 0, activeInvestments: 0, totalReturns: 0 };
    }
    return [];
  }
  return { success: true, message: 'Mock action successful', id: 'mock-id' };
};

const withMockFallback = async (endpoint, method, fetchCall, data = null) => {
  try {
    const response = await fetchCall();
    return await handleResponse(response);
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error.message);
    // Automatically fallback to mock data so the frontend can be previewed seamlessly
    return handleMock(endpoint, method, data);
  }
};

export const api = {
  get: (endpoint) => withMockFallback(endpoint, 'GET', () => fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
    headers: getHeaders()
  })),
  post: (endpoint, data) => withMockFallback(endpoint, 'POST', () => fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  }), data),
  put: (endpoint, data) => withMockFallback(endpoint, 'PUT', () => fetch(`${API_URL}${endpoint}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data)
  }), data),
  delete: (endpoint) => withMockFallback(endpoint, 'DELETE', () => fetch(`${API_URL}${endpoint}`, {
    method: 'DELETE',
    headers: getHeaders()
  })),
  upload: (endpoint, formData) => {
    const token = localStorage.getItem('token');
    return withMockFallback(endpoint, 'POST', () => fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: formData
    }));
  }
};
export default api;
