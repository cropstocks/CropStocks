const SATELLITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || data.error || 'Satellite API request failed');
  }
  return data;
};

export const satelliteApi = {
  registerFarm: async (data) => {
    const url = `${SATELLITE_API_URL}/farmers/register`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await handleResponse(response);
    } catch (err) {
      if (err.message === 'Failed to fetch' || err.message.includes('fetch')) {
        throw new Error(`Network Error: Cannot connect to ${url}. Is the backend running?`);
      }
      throw err;
    }
  },
  
  checkStatus: async (farmerId) => {
    const response = await fetch(`${SATELLITE_API_URL}/farmers/${farmerId}/satellite-status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  }
};
