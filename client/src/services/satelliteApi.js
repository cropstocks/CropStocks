const SATELLITE_API_URL = import.meta.env.VITE_SATELLITE_API_URL || 'http://localhost:8000/api';

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || data.error || 'Satellite API request failed');
  }
  return data;
};

export const satelliteApi = {
  registerFarm: async (data) => {
    const response = await fetch(`${SATELLITE_API_URL}/farmers/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
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
