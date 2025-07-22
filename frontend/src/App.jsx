// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import SubjectsPage from './pages/SubjectsPage';
import MaterialsPage from './pages/MaterialsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow p-4 container mx-auto">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/subjects" element={<SubjectsPage />} />
                    <Route path="/materials" element={<MaterialsPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <footer className="bg-gray-800 text-white p-4 text-center">
                &copy; {new Date().getFullYear()} School Management System
            </footer>
        </div>
    );
}

export default App;