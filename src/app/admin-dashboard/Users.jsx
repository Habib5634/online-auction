'use client'
import { API_URL, getAuthHeaders } from '@/utils/apiUrl'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Users = () => {

    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleFetchUsers = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/admin/users`, getAuthHeaders())
            console.log(data)
            setUsers(data?.users)
        } catch (error) {
            console.log(error)
        }
    }
    const confirmDelete = (productId) => {
        setSelectedUserId(productId);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        handleDelete(selectedUserId);
        setShowModal(false);
    };
    useEffect(() => {
        handleFetchUsers()
    }, [])

    const filteredUsers = users.filter(user =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

      // Delete a product with auth headers
        const handleDelete = async (id) => {
            try {
                const { data } = await axios.delete(`${API_URL}/admin/user/${id}`, getAuthHeaders());
    
                if (data.success) {
                    setUsers(users.filter(user => user._id !== id));
                }
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        };
    
    return (
        <div className="p-6">
            <div className='flex justify-between items-center'>

                <h2 className="text-2xl font-bold mb-4">Users List</h2>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border bg-transparent rounded-md w-full max-w-md mb-4"
                />

            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full  shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            {[, "Name",  "email", "Type",  "Actions"].map((header) => (
                                <th key={header} className="p-3 text-left">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className="border-b hover:bg-gray-50">
                               
                                <td className="p-3">{user.fullName}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">{user.userType}</td>
                               
                                <td className="p-3 flex gap-2">
                                    
                                    <button
                                        onClick={() => confirmDelete(user._id)}
                                        className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
                        <p className="mb-4">This action cannot be undone.</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 bg-purpledark text-white rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Users
