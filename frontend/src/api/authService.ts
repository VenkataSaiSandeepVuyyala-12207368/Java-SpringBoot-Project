import api from './api';

// Define the shape of the user object returned from the API
interface User {
    id: number;
    username: string;
    email: string;
    role: 'STUDENT' | 'TEACHER';
}

// Define the shape of the registration data
interface RegisterData {
    username: string;
    email: string;
    password: string;
    role: string;
}

export const login = async (username: string, password: string): Promise<User> => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
};

export const register = async (data: RegisterData): Promise<User> => {
    const response = await api.post('/users', data);
    return response.data;
};

export const logout = async (): Promise<void> => {
    await api.post('/auth/logout');
};

export const checkAuthStatus = async (): Promise<User> => {
    const response = await api.get('/auth/status');
    return response.data;
};