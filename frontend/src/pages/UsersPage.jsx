// src/pages/UsersPage.jsx
import React, { useEffect, useState } from 'react';
import * as userService from '../services/userService';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'STUDENT' });
    const [editingUser, setEditingUser] = useState(null); // State to hold user being edited

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await userService.getAllUsers();
            setUsers(data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch users:", err);
            setError("Failed to load users. Please try again.");
            toast.error("Failed to load users!");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editingUser) {
            setEditingUser({ ...editingUser, [name]: value });
        } else {
            setNewUser({ ...newUser, [name]: value });
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            // Basic validation for demonstration
            if (!newUser.username || !newUser.email || !newUser.password) {
                toast.error("Please fill in all required fields.");
                return;
            }
            if (await userService.existsByUsername(newUser.username)) {
                toast.error("Username already exists!");
                return;
            }
            if (await userService.existsByEmail(newUser.email)) {
                toast.error("Email already exists!");
                return;
            }

            const createdUser = await toast.promise(
                userService.createUser(newUser),
                {
                    loading: 'Creating user...',
                    success: 'User created successfully!',
                    error: 'Error creating user. Check console for details.',
                }
            );
            setUsers([...users, createdUser]);
            setNewUser({ username: '', email: '', password: '', role: 'STUDENT' });
        } catch (err) {
            console.error("Error creating user:", err);
            // The toast.promise already handles the error toast
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        if (!editingUser) return;

        try {
            const updatedUser = await toast.promise(
                userService.updateUser(editingUser.id, editingUser),
                {
                    loading: 'Updating user...',
                    success: 'User updated successfully!',
                    error: 'Error updating user. Check console for details.',
                }
            );
            setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
            setEditingUser(null); // Exit editing mode
        } catch (err) {
            console.error("Error updating user:", err);
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await toast.promise(
                    userService.deleteUser(id),
                    {
                        loading: 'Deleting user...',
                        success: 'User deleted successfully!',
                        error: 'Error deleting user. Check console for details.',
                    }
                );
                setUsers(users.filter(user => user.id !== id));
            } catch (err) {
                console.error("Error deleting user:", err);
            }
        }
    };

    const startEditing = (user) => {
        setEditingUser({ ...user }); // Create a copy to edit
    };

    const cancelEditing = () => {
        setEditingUser(null);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="text-center text-red-600 font-semibold">{error}</div>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>

            {/* Create New User Form */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">{editingUser ? 'Edit User' : 'Create New User'}</h2>
                <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={editingUser ? editingUser.username : newUser.username}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={editingUser ? editingUser.email : newUser.email}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={editingUser ? editingUser.password : newUser.password}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                            required={!editingUser} // Password is only required for new user creation
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={editingUser ? editingUser.role : newUser.role}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                        >
                            <option value="STUDENT">STUDENT</option>
                            <option value="TEACHER">TEACHER</option>
                        </select>
                    </div>
                    <div className="col-span-1 md:col-span-2 flex justify-end space-x-2">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {editingUser ? 'Update User' : 'Add User'}
                        </button>
                        {editingUser && (
                            <button
                                type="button"
                                onClick={cancelEditing}
                                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* User List */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Existing Users</h2>
            {users.length === 0 ? (
                <p className="text-gray-600">No users found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.username}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => startEditing(user)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
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

export default UsersPage;