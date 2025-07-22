// src/pages/SubjectsPage.jsx
import React, { useEffect, useState } from 'react';
import * as subjectService from '../services/subjectService';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

function SubjectsPage() {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newSubjectName, setNewSubjectName] = useState('');
    const [editingSubject, setEditingSubject] = useState(null); // State to hold subject being edited
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        fetchSubjects();
    }, []); // Initial fetch

    useEffect(() => {
        // Debounce search input
        const timer = setTimeout(() => {
            fetchSubjects(searchKeyword);
        }, 300); // Wait 300ms after user stops typing
        return () => clearTimeout(timer);
    }, [searchKeyword]); // Refetch when searchKeyword changes

    const fetchSubjects = async (keyword = '') => {
        try {
            setLoading(true);
            const data = await subjectService.getAllSubjects(keyword);
            setSubjects(data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch subjects:", err);
            setError("Failed to load subjects. Please try again.");
            toast.error("Failed to load subjects!");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { value } = e.target;
        if (editingSubject) {
            setEditingSubject({ ...editingSubject, name: value });
        } else {
            setNewSubjectName(value);
        }
    };

    const handleCreateSubject = async (e) => {
        e.preventDefault();
        try {
            if (!newSubjectName.trim()) {
                toast.error("Subject name cannot be empty.");
                return;
            }

            const createdSubject = await toast.promise(
                subjectService.createSubject({ name: newSubjectName }),
                {
                    loading: 'Creating subject...',
                    success: 'Subject created successfully!',
                    error: (err) => {
                        if (err.response && err.response.status === 400) {
                            return 'Subject with this name already exists!';
                        }
                        return 'Error creating subject. Check console for details.';
                    },
                }
            );
            setSubjects([...subjects, createdSubject]);
            setNewSubjectName('');
        } catch (err) {
            console.error("Error creating subject:", err);
        }
    };

    const handleUpdateSubject = async (e) => {
        e.preventDefault();
        if (!editingSubject) return;

        try {
            const updatedSubject = await toast.promise(
                subjectService.updateSubject(editingSubject.id, editingSubject),
                {
                    loading: 'Updating subject...',
                    success: 'Subject updated successfully!',
                    error: 'Error updating subject. Check console for details.',
                }
            );
            setSubjects(subjects.map(subject => subject.id === updatedSubject.id ? updatedSubject : subject));
            setEditingSubject(null); // Exit editing mode
        } catch (err) {
            console.error("Error updating subject:", err);
        }
    };

    const handleDeleteSubject = async (id) => {
        if (window.confirm("Are you sure you want to delete this subject?")) {
            try {
                await toast.promise(
                    subjectService.deleteSubject(id),
                    {
                        loading: 'Deleting subject...',
                        success: 'Subject deleted successfully!',
                        error: 'Error deleting subject. Check console for details.',
                    }
                );
                setSubjects(subjects.filter(subject => subject.id !== id));
            } catch (err) {
                console.error("Error deleting subject:", err);
            }
        }
    };

    const startEditing = (subject) => {
        setEditingSubject({ ...subject }); // Create a copy to edit
    };

    const cancelEditing = () => {
        setEditingSubject(null);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="text-center text-red-600 font-semibold">{error}</div>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Subject Management</h1>

            {/* Create/Edit Subject Form */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">{editingSubject ? 'Edit Subject' : 'Create New Subject'}</h2>
                <form onSubmit={editingSubject ? handleUpdateSubject : handleCreateSubject} className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Subject Name"
                        value={editingSubject ? editingSubject.name : newSubjectName}
                        onChange={handleChange}
                        className="flex-grow mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                        required
                    />
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {editingSubject ? 'Update Subject' : 'Add Subject'}
                    </button>
                    {editingSubject && (
                        <button
                            type="button"
                            onClick={cancelEditing}
                            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                    )}
                </form>
            </div>

            {/* Search Input */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search subjects by name..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                />
            </div>

            {/* Subject List */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Existing Subjects</h2>
            {subjects.length === 0 ? (
                <p className="text-gray-600">No subjects found {searchKeyword && `for "${searchKeyword}"`}.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {subjects.map((subject) => (
                            <tr key={subject.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subject.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subject.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => startEditing(subject)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteSubject(subject.id)}
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

export default SubjectsPage;