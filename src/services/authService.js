import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const register = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const login = (userData) => axios.post(`${API_URL}/auth/login`, userData);