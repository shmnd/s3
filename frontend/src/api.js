import axios from 'axios';

const api = axios.create({
    baseURL: 'https://s3proj.duckdns.org/api/',
});

export default api;
