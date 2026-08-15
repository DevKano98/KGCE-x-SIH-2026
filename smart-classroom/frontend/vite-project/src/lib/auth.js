// frontend/src/lib/auth.js
export const getUser = () => {
  try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
};