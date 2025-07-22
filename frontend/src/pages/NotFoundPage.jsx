// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] p-4 text-center">
            <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
            <h2 className="text-3xl font-bold text-gray-600 mb-4">Page Not Found</h2>
            <p className="text-lg text-gray-500 mb-8">
                Oops! The page you're looking for does not exist.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
            >
                Go to Home
            </Link>
        </div>
    );
}

export default NotFoundPage;