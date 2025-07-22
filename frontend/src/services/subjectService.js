// src/services/subjectService.js
import api from './api';

const SUBJECTS_API_URL = '/subjects';

export const getAllSubjects = async (keyword = '') => {
    const response = await api.get(SUBJECTS_API_URL, {
        params: { keyword: keyword } // Pass keyword as a query parameter
    });
    return response.data;
};

export const getSubjectById = async (id) => {
    const response = await api.get(`${SUBJECTS_API_URL}/${id}`);
    return response.data;
};

export const createSubject = async (subject) => {
    const response = await api.post(SUBJECTS_API_URL, subject);
    return response.data;
};

export const updateSubject = async (id, subjectDetails) => {
    const response = await api.put(`${SUBJECTS_API_URL}/${id}`, subjectDetails);
    return response.data;
};

export const deleteSubject = async (id) => {
    await api.delete(`${SUBJECTS_API_URL}/${id}`);
};