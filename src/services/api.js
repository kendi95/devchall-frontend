import axios from 'axios';
import 'dotenv/config';

const api = axios.create({
    baseURL: `http://localhost:${process.env.PORT}`
});

export default api;