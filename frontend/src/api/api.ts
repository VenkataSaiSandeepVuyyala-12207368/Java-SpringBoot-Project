import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Your Spring Boot API URL
    withCredentials: true, // Important for session cookies
});

export default api;