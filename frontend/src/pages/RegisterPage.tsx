import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/authService';
import toast from 'react-hot-toast';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('STUDENT');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register({ username, email, password, role });
            toast.success('Registration successful! Please log in.');
            navigate('/login');
        } catch (error) {
            toast.error('Registration failed. Username or email may already exist.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 border rounded mt-1" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mt-1" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mt-1" required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700">Role</label>
                    <select value={role} onChange={e => setRole(e.target.value)} className="w-full p-2 border rounded mt-1">
                        <option value="STUDENT">Student</option>
                        <option value="TEACHER">Teacher</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700">
                    Register
                </button>
            </form>
        </div>
    );
}