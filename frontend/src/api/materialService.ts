import api from './api';

export const getMaterials = async () => {
    const response = await api.get('/materials');
    return response.data;
};

export const searchMaterials = async (type: 'title' | 'uploader', term: string) => {
    const response = await api.get('/materials/search', {
        params: { [type]: term }
    });
    return response.data;
};

export const getSubjects = async () => {
    const response = await api.get('/subjects');
    return response.data;
};

// The data type matches the object we build in the AddMaterialPage component
export const createMaterial = async (data: { title: string; description: string; url: string; type: string; subject: { id: number } }) => {
    const response = await api.post('/materials', data);
    return response.data;
};

export const deleteMaterial = async (id: number) => {
    const response = await api.delete(`/materials/${id}`);
    return response.data;
};