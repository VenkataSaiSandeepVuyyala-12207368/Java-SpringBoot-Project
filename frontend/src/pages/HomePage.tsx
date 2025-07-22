import { useState, useEffect } from 'react';
import { getMaterials, searchMaterials } from '../api/materialService';
import MaterialCard from '../components/MaterialCard';

export default function HomePage() {
    const [materials, setMaterials] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('title'); // 'title' or 'uploader'

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await getMaterials();
        setMaterials(data);
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            fetchData(); // Reset if search is empty
            return;
        }
        const data = await searchMaterials(searchType, searchTerm);
        setMaterials(data);
    };

    const handleDelete = (deletedId: number) => {
        setMaterials(prev => prev.filter(m => m.id !== deletedId));
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Shared Materials</h1>
            <form onSubmit={handleSearch} className="mb-8 p-4 bg-white rounded-lg shadow flex gap-4 items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="flex-grow p-2 border rounded"
                />
                <select value={searchType} onChange={(e) => setSearchType(e.target.value)} className="p-2 border rounded">
                    <option value="title">By Title</option>
                    <option value="uploader">By Uploader</option>
                </select>
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Search</button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {materials.map((material) => (
                    <MaterialCard key={material.id} material={material} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
}