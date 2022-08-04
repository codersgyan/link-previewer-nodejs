import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const fetchMeta = (url) => api.get(`/api/meta?url=${url}`);
