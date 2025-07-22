import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../api/authService';
import toast from 'react-hot-toast';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
            toast.success('Logged out successfully');
            navigate('/login');
        } catch (error) {
            toast.error('Logout failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="text-2xl font-bold text-indigo-600">SMS Materials</Link>
                        <div className="flex items-center space-x-4">
                            <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
                            {user && <Link to="/add-material" className="text-gray-600 hover:text-indigo-600">Add Material</Link>}
                            {user ? (
                                <>
                                    <span className="text-gray-800">Welcome, {user.username}</span>
                                    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">Login</Link>
                                    <Link to="/register" className="text-gray-600 hover:text-indigo-600">Register</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}