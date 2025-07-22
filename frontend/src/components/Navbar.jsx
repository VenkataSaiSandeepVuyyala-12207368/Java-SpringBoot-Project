import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-blue-600 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">
                    SMS
                </Link>
                <div className="space-x-4">
                    <Link to="/users" className="text-white hover:text-blue-200">
                        Users
                    </Link>
                    <Link to="/subjects" className="text-white hover:text-blue-200">
                        Subjects
                    </Link>
                    <Link to="/materials" className="text-white hover:text-blue-200">
                        Materials
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;