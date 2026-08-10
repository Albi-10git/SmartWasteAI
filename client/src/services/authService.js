import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api', withCredentials: true })
export const getCurrentUser = () => api.get('/me').then((response) => response.data)
export const login = (credentials) => api.post('/login', credentials).then((response) => response.data)
export const signup = (details) => api.post('/signup', details).then((response) => response.data)
export const logout = () => api.post('/logout')
