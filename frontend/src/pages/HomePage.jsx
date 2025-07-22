// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] p-4">
            <h1 className="text-5xl font-extrabold text-blue-700 mb-6 animate-fade-in">
                Welcome to School Management System
            </h1>
            <p className="text-xl text-gray-700 mb-8 text-center max-w-2xl">
                Manage users, subjects, and educational materials efficiently.
            </p>
            <div className="flex space-x-6">
                <Link
                    to="/users"
                    className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                >
                    Manage Users
                </Link>
                <Link
                    to="/subjects"
                    className="px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
                >
                    Manage Subjects
                </Link>
                <Link
                    to="/materials"
                    className="px-8 py-4 bg-purple-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-300"
                >
                    Manage Materials
                </Link>
            </div>

            {/* Basic animations for a nicer feel */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
        </div>
    );
}

export default HomePage;