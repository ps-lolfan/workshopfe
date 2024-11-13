import axios from 'axios';
const MAIN_API_URL = import.meta.env.VITE_API_URL;
const API_URL = `${MAIN_API_URL}/books`;
const getAuthHeaders = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

export const getBooks = () => axios.get(API_URL, getAuthHeaders());
export const addBook = (bookData) => axios.post(API_URL, bookData, getAuthHeaders());
export const updateBook = (id, bookData) => axios.put(`${API_URL}/${id}`, bookData, getAuthHeaders());
export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`, getAuthHeaders());
