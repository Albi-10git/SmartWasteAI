import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api', withCredentials: true })

export const getComplaints = (filters = {}) => api.get('/complaints', { params: filters }).then((response) => response.data)
export const getComplaint = (id) => api.get(`/complaints/${id}`).then((response) => response.data)
export const createComplaint = (complaint) => api.post('/complaints', complaint).then((response) => response.data)
export const updateComplaint = (id, complaint) => api.put(`/complaints/${id}`, complaint).then((response) => response.data)
export const deleteComplaint = (id) => api.delete(`/complaints/${id}`)
