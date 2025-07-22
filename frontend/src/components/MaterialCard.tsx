import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { deleteMaterial } from '../api/materialService';

// Define the shape of your data objects
interface Subject { id: number; name: string; }
interface User { id: number; username: string; }
interface Material {
    id: number;
    title: string;
    description: string;
    url: string;
    type: string;
    subject: Subject;
    uploadedBy: User;
}

interface MaterialCardProps {
    material: Material;
    onDelete: (id: number) => void;
}

export default function MaterialCard({ material, onDelete }: MaterialCardProps) {
    const { user } = useAuth();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this material?')) {
            try {
                await deleteMaterial(material.id);
                toast.success('Material deleted!');
                onDelete(material.id);
            } catch (error) {
                toast.error('Failed to delete material. You may not be the owner.');
            }
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1">
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{material.title}</h3>
                    <span className="px-2 py-1 text-xs font-semibold text-indigo-800 bg-indigo-200 rounded-full">{material.subject.name}</span>
                </div>
                <p className="text-gray-600 mb-4">{material.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>By: {material.uploadedBy?.username || 'Unknown'}</span>
                    <span>Type: {material.type}</span>
                </div>
                <div className="mt-4 flex space-x-2">
                    <a href={material.url} target="_blank" rel="noopener noreferrer" className="flex-1 text-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">View Material</a>
                    {user && user.id === material.uploadedBy?.id && (
                        <>
                            {/* Edit functionality can be added here */}
                            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}