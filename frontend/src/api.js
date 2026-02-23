import axios from 'axios';

const api = axios.create({
    baseURL: 'http://13.62.126.53/api/',
});

export default api;
