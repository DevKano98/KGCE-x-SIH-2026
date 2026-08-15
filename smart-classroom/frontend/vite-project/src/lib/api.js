// frontend/src/lib/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export async function api(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Session expired');
  }
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Error' }));
    throw new Error(errorData.error || 'Request failed');
  }
  if (response.status === 204) return null;
  return response.json();
}