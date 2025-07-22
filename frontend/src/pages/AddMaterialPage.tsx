import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMaterial, getSubjects } from '../api/materialService';
import toast from 'react-hot-toast';

export default function AddMaterialPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [type, setType] = useState('WEBSITE');
    const [subjectId, setSubjectId] = useState('');
    const [subjects, setSubjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const data = await getSubjects();
                setSubjects(data);
                if (data.length > 0) {
                    setSubjectId(data[0].id); // Default to the first subject
                }
            } catch (error) {
                toast.error("Could not load subjects.");
            }
        };
        fetchSubjects();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!subjectId) {
            toast.error("Please select a subject.");
            return;
        }

        const materialData = {
            title,
            description,
            url,
            type,
            subject: { id: parseInt(subjectId) }
        };

        try {
            await createMaterial(materialData);
            toast.success('Material added successfully!');
            navigate('/');
        } catch (error) {
            toast.error('Failed to add material.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Material</h2>
    <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
    <label className="block text-gray-700">Title</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded mt-1" required />
    </div>
    {/* Description */}
    <div className="mb-4">
    <label className="block text-gray-700">Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded mt-1" rows={4}></textarea>
        </div>
    {/* URL */}
    <div className="mb-4">
    <label className="block text-gray-700">URL</label>
        <input type="url" value={url} onChange={e => setUrl(e.target.value)} className="w-full p-2 border rounded mt-1" required />
    </div>
    {/* Type */}
    <div className="mb-4">
    <label className="block text-gray-700">Type</label>
        <select value={type} onChange={e => setType(e.target.value)} className="w-full p-2 border rounded mt-1">
    <option value="WEBSITE">Website</option>
        <option value="GOOGLE_DRIVE">Google Drive</option>
    <option value="YOUTUBE">YouTube</option>
        <option value="OTHER">Other</option>
        </select>
        </div>
    {/* Subject */}
    <div className="mb-6">
    <label className="block text-gray-700">Subject</label>
        <select value={subjectId} onChange={e => setSubjectId(e.target.value)} className="w-full p-2 border rounded mt-1" required>
    <option value="" disabled>Select a subject</option>
    {subjects.map(subject => (
        <option key={subject.id} value={subject.id}>{subject.name}</option>
    ))}
    </select>
    </div>
    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
        Add Material
    </button>
    </form>
    </div>
);
}