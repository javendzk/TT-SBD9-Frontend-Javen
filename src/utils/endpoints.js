import axios from 'axios';

const baseURL = 'https://klinikjaven-ttsbd9-be-javen.vercel.app';
const api = axios.create({ baseURL });

export const loginUser = (data) => api.post('/account/login', data);
export const registerUser = (data) => api.post('/account/register', data);
export const getAppointments = (userId) => api.get(`/appointments?user_id=${userId}`);
export const getAllDoctors = () => api.get('/doctors');
export const createAppointment = (data) => api.post('/appointments', data);
export const updateAppointment = (id, data) => api.put(`/appointments/${id}`, data);
export const deleteAppointment = (id) => api.delete(`/appointments/${id}`);

export default api;