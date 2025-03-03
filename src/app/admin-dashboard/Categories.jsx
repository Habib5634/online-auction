import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, getAuthHeaders } from "@/utils/apiUrl";

const CategoriesTable = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: "", description: "" });

    // Fetch Categories
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${API_URL}/admin/categories`,getAuthHeaders());
            if (res.data.success) {
                setCategories(res.data.categories);
            }
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    };

    // Toggle Status
    const toggleStatus = async (categoryId) => {
        try {
            await axios.put(`${API_URL}/admin/category/${categoryId}`,{},getAuthHeaders());
            fetchCategories(); // Refresh data
        } catch (error) {
            console.error("Error updating status", error);
        }
    };

    // Delete Category
    const deleteCategory = async (categoryId) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        try {
            await axios.delete(`${API_URL}/admin/category/${categoryId}`,getAuthHeaders());
            fetchCategories();
        } catch (error) {
            console.error("Error deleting category", error);
        }
    };

    // Handle Form Input
    const handleInputChange = (e) => {
        setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
    };

    // Add Category
    const addCategory = async () => {
        try {
            await axios.post(`${API_URL}/admin/category/`, newCategory,getAuthHeaders());
            setShowModal(false);
            setNewCategory({ name: "", description: "" });
            fetchCategories();
        } catch (error) {
            console.error("Error adding category", error);
        }
    };

    const handleCloseModal =()=>{
        setShowModal(false)
    }
    return (
        <div className="p-4">
            <button className="bg-purplelight text-white px-4 py-2 rounded" onClick={() => setShowModal(true)}>
                Add New Category
            </button>

            {/* Categories Table */}
            <table className="w-full mt-4 border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Name</th>
                        <th className="p-2">Description</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category._id} className="border-b">
                            <td className="p-2">{category.name}</td>
                            <td className="p-2">{category.description}</td>
                            <td className="p-2">
                                <span className={`px-2 py-1 text-white rounded ${category.isActive ? 'bg-green-500' : 'bg-red-500'}`}>
                                    {category.isActive ? "Active" : "Inactive"}
                                </span>
                            </td>
                            <td className="p-2">
                                <button className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded" onClick={() => toggleStatus(category._id)}>
                                    {category.isActive ? "Deactivate" : "Activate"}
                                </button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteCategory(category._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Category Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-5 rounded shadow-lg w-96">
                        <div className="flex justify-between items-center text-black">
                        <h2 className="text-xl font-bold mb-4">Add New Category</h2>
                        <h2 onClick={handleCloseModal} className="text-xl font-bold mb-4">Close</h2>

                        </div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Category Name"
                            value={newCategory.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-purpledark text-black rounded mb-2"
                        />
                        <textarea
                            name="description"
                            placeholder="Category Description"
                            value={newCategory.description}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-purpledark text-black rounded mb-2"
                        />
                        <div className="flex justify-end">
                            <button className="bg-gray text-white px-4 py-2 rounded mr-2" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                            <button className="bg-purple text-white px-4 py-2 rounded" onClick={addCategory}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoriesTable;
