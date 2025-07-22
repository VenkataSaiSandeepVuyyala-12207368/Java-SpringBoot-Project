
import api from './api';

const USERS_API_URL = '/users';

export const getAllUsers = async () => {
    const response = await api.get(USERS_API_URL);
    return response.data;
};

export const getUserById = async (id) => {
    const response = await api.get(`${USERS_API_URL}/${id}`);
    return response.data;
};

export const createUser = async (user) => {
    const response = await api.post(USERS_API_URL, user);
    return response.data;
};

export const updateUser = async (id, userDetails) => {
    const response = await api.put(`${USERS_API_URL}/${id}`, userDetails);
    return response.data;
};

export const deleteUser = async (id) => {
    await api.delete(`${USERS_API_URL}/${id}`);
};

export const existsByUsername = async (username) => {
    const response = await api.get(`${USERS_API_URL}/exists/username/${username}`);
    return response.data;
};

export const existsByEmail = async (email) => {
    const response = await api.get(`${USERS_API_URL}/exists/email/${email}`);
    return response.data;
};