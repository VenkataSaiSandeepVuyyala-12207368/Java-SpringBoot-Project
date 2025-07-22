// src/pages/MaterialsPage.jsx
import React, { useEffect, useState } from 'react';
import * as materialService from '../services/materialService';
import * as userService from '../services/userService'; // Needed for uploader dropdown
import * as subjectService from '../services/subjectService'; // Needed for subject dropdown
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

function MaterialsPage() {
    const [materials, setMaterials] = useState([]);
    const [users, setUsers] = useState([]); // For dropdown
    const [subjects, setSubjects] = useState([]); // For dropdown
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newMaterial, setNewMaterial] = useState({
        title: '',
        description: '',
        url: '',
        type: 'WEBSITE', // Default type
        uploadedBy: { id: '' }, // Placeholder for user ID
        subject: { id: '' },   // Placeholder for subject ID
    });
    const [editingMaterial, setEditingMaterial] = useState(null);
    const materialTypes = ['GOOGLE_DRIVE', 'YOUTUBE', 'WEBSITE', 'OTHER'];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [materialsData, usersData, subjectsData] = await Promise.all([
                materialService.getAllMaterials(),
                userService.getAllUsers(),
                subjectService.getAllSubjects(),
            ]);
            setMaterials(materialsData);
            setUsers(usersData);
            setSubjects(subjectsData);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch data for materials page:", err);
            setError("Failed to load materials or related data. Please try again.");
            toast.error("Failed to load materials!");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editingMaterial) {
            setEditingMaterial(prev => {
                if (name === 'uploadedBy') {
                    return { ...prev, uploadedBy: { id: value } };
                }
                if (name === 'subject') {
                    return { ...prev, subject: { id: value } };
                }
                return { ...prev, [name]: value };
            });
        } else {
            setNewMaterial(prev => {
                if (name === 'uploadedBy') {
                    return { ...prev, uploadedBy: { id: value } };
                }
                if (name === 'subject') {
                    return { ...prev, subject: { id: value } };
                }
                return { ...prev, [name]: value };
            });
        }
    };

    const handleCreateMaterial = async (e) => {
        e.preventDefault();
        try {
            // Basic validation
            if (!newMaterial.title || !newMaterial.url || !newMaterial.uploadedBy.id || !newMaterial.subject.id) {
                toast.error("Please fill in all required fields (Title, URL, Uploader, Subject).");
                return;
            }

            // Ensure IDs are numbers
            const materialToCreate = {
                ...newMaterial,
                uploadedBy: { id: parseInt(newMaterial.uploadedBy.id) },
                subject: { id: parseInt(newMaterial.subject.id) },
            };

            const createdMaterial = await toast.promise(
                materialService.createMaterial(materialToCreate),
                {
                    loading: 'Creating material...',
                    success: 'Material created successfully!',
                    error: 'Error creating material. Check console for details.',
                }
            );
            setMaterials([...materials, createdMaterial]);
            setNewMaterial({ title: '', description: '', url: '', type: 'WEBSITE', uploadedBy: { id: '' }, subject: { id: '' } });
        } catch (err) {
            console.error("Error creating material:", err);
        }
    };

    const handleUpdateMaterial = async (e) => {
        e.preventDefault();
        if (!editingMaterial) return;

        try {
            // Ensure IDs are numbers for update
            const materialToUpdate = {
                ...editingMaterial,
                uploadedBy: { id: parseInt(editingMaterial.uploadedBy.id) },
                subject: { id: parseInt(editingMaterial.subject.id) },
            };

            const updatedMaterial = await toast.promise(
                materialService.updateMaterial(editingMaterial.id, materialToUpdate),
                {
                    loading: 'Updating material...',
                    success: 'Material updated successfully!',
                    error: 'Error updating material. Check console for details.',
                }
            );
            setMaterials(materials.map(mat => mat.id === updatedMaterial.id ? updatedMaterial : mat));
            setEditingMaterial(null);
        } catch (err) {
            console.error("Error updating material:", err);
        }
    };

    const handleDeleteMaterial = async (id) => {
        if (window.confirm("Are you sure you want to delete this material?")) {
            try {
                await toast.promise(
                    materialService.deleteMaterial(id),
                    {
                        loading: 'Deleting material...',
                        success: 'Material deleted successfully!',
                        error: 'Error deleting material. Check console for details.',
                    }
                );
                setMaterials(materials.filter(mat => mat.id !== id));
            } catch (err) {
                console.error("Error deleting material:", err);
            }
        }
    };

    const startEditing = (material) => {
        setEditingMaterial({
            ...material,
            uploadedBy: { id: material.uploadedBy?.id || '' }, // Ensure object structure for dropdown
            subject: { id: material.subject?.id || '' },
        });
    };

    const cancelEditing = () => {
        setEditingMaterial(null);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="text-center text-red-600 font-semibold">{error}</div>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Material Management</h1>

            {/* Create/Edit Material Form */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">{editingMaterial ? 'Edit Material' : 'Create New Material'}</h2>
                <form onSubmit={editingMaterial ? handleUpdateMaterial : handleCreateMaterial} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={editingMaterial ? editingMaterial.title : newMaterial.title}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
                        <input
                            type="url"
                            id="url"
                            name="url"
                            value={editingMaterial ? editingMaterial.url : newMaterial.url}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                            required
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={editingMaterial ? editingMaterial.description || '' : newMaterial.description}
                            onChange={handleChange}
                            rows="3"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Material Type</label>
                        <select
                            id="type"
                            name="type"
                            value={editingMaterial ? editingMaterial.type : newMaterial.type}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                            required
                        >
                            {materialTypes.map(type => (
                                <option key={type} value={type}>{type.replace('_', ' ')}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="uploadedBy" className="block text-sm font-medium text-gray-700">Uploaded By</label>
                        <select
                            id="uploadedBy"
                            name="uploadedBy"
                            value={editingMaterial ? editingMaterial.uploadedBy?.id : newMaterial.uploadedBy.id}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                            required
                        >
                            <option value="">Select Uploader</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.username} ({user.role})</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                        <select
                            id="subject"
                            name="subject"
                            value={editingMaterial ? editingMaterial.subject?.id : newMaterial.subject.id}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                            required
                        >
                            <option value="">Select Subject</option>
                            {subjects.map(subject => (
                                <option key={subject.id} value={subject.id}>{subject.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-1 md:col-span-2 flex justify-end space-x-2">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {editingMaterial ? 'Update Material' : 'Add Material'}
                        </button>
                        {editingMaterial && (
                            <button
                                type="button"
                                onClick={cancelEditing}
                                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Material List */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Existing Materials</h2>
            {materials.length === 0 ? (
                <p className="text-gray-600">No materials found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Subject
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Uploaded By
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                URL
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {materials.map((material) => (
                            <tr key={material.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.subject?.name || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.uploadedBy?.username || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <a href={material.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Link</a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => startEditing(material)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteMaterial(material.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default MaterialsPage;