// src/services/materialService.js
import api from './api';

const MATERIALS_API_URL = '/materials';

export const getAllMaterials = async () => {
    const response = await api.get(MATERIALS_API_URL);
    return response.data;
};

export const getMaterialById = async (id) => {
    const response = await api.get(`${MATERIALS_API_URL}/${id}`);
    return response.data;
};

export const getMaterialsByType = async (type) => {
    const response = await api.get(`${MATERIALS_API_URL}/type/${type}`);
    return response.data;
};

export const getMaterialsBySubjectId = async (subjectId) => {
    const response = await api.get(`${MATERIALS_API_URL}/subject/${subjectId}`);
    return response.data;
};

export const getMaterialsByUploaderId = async (userId) => {
    const response = await api.get(`${MATERIALS_API_URL}/uploader/${userId}`);
    return response.data;
};

export const createMaterial = async (material) => {
    const response = await api.post(MATERIALS_API_URL, material);
    return response.data;
};

export const updateMaterial = async (id, materialDetails) => {
    const response = await api.put(`${MATERIALS_API_URL}/${id}`, materialDetails);
    return response.data;
};

export const deleteMaterial = async (id) => {
    await api.delete(`${MATERIALS_API_URL}/${id}`);
};