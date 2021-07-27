import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.36/sub/remember_again_api/api',
});

export default api;
