'use client'
import { API_URL, getAuthHeaders } from '@/utils/apiUrl'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const DashProducts = () => {
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showShippingModal, setShowShippingModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedShippingStatus, setSelectedShippingStatus] = useState("");

    const handleFetchProduct = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/admin/products`, getAuthHeaders())
            console.log(data)
            setProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleFetchProduct()
    }, [])
    // Filter products based on search term
    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const confirmDelete = (productId) => {
        setSelectedProductId(productId);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        handleDelete(selectedProductId);
        setShowDeleteModal(false);
    };
    // Delete a product with auth headers
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${API_URL}/admin/product/${id}`, getAuthHeaders());

            if (data.success) {
                setProducts(products.filter(product => product._id !== id));
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // Close a product (mark isOpen as false) with auth headers
    const handleClose = async (id) => {
        try {
            const { data } = await axios.put(
                `${API_URL}/admin/product/${id}`,
                { isOpen: false },
                getAuthHeaders()
            );

            if (data.success) {
                setProducts(products.map(product =>
                    product._id === id ? { ...product, isOpen: false } : product
                ));
            }
        } catch (error) {
            console.error("Error closing product:", error);
        }
    };

    // Change shipping status
    const handleShippingStatusChange = (productId, status) => {
        setSelectedProductId(productId);
        setSelectedShippingStatus(status);
        setShowShippingModal(true);
    };

    const handleConfirmShippingStatusChange = async () => {
        try {
            const { data } = await axios.put(
                `${API_URL}/admin/product/${selectedProductId}`,
                { shippingStatus: selectedShippingStatus },
                getAuthHeaders()
            );

            if (data.success) {
                setProducts(products.map(product =>
                    product._id === selectedProductId ? { ...product, shippingStatus: selectedShippingStatus } : product
                ));
            }
        } catch (error) {
            console.error("Error updating shipping status:", error);
        }
        setShowShippingModal(false);
    };

    return (
        <div className="p-6">
            <div className='flex justify-between items-center'>

                <h2 className="text-2xl font-bold mb-4">Product List</h2>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border bg-transparent rounded-md w-full max-w-md mb-4"
                />

            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full  shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            {["Image", "Name", "Category", "Seller", "Price", "Status", "Shipping Status", "Actions"].map((header) => (
                                <th key={header} className="p-3 text-left">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product._id} className="border-b hover:bg-gray-50">
                                <td className="p-3">
                                    <img src={product.images[0]} alt={product.productName} className="w-16 h-16 object-cover rounded-md" />
                                </td>
                                <td className="p-3">{product.productName}</td>
                                <td className="p-3">{product.productCategory.name}</td>
                                <td className="p-3">{product.sellerId.fullName}</td>
                                <td className="p-3">${product.price}</td>
                                <td className="p-3">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${product.isOpen ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                                        {product.isOpen ? "Open" : "Closed"}
                                    </span>
                                </td>
                                <td className="p-3 text-black">
                                    <select
                                        value={product.shippingStatus || "pending"}
                                        onChange={(e) => handleShippingStatusChange(product._id, e.target.value)}
                                        className="p-1 border rounded-md"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </td>
                                <td className="p-3 flex gap-2">
                                    {product.isOpen && (
                                        <button
                                            onClick={() => handleClose(product._id)}
                                            className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                        >
                                            Close
                                        </button>
                                    )}
                                    <button
                                        onClick={() => confirmDelete(product._id)}
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

            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
                        <p className="mb-4">This action cannot be undone.</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
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

            {showShippingModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Change Shipping Status</h2>
                        <p className="mb-4">Are you sure you want to change the shipping status to {selectedShippingStatus}?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowShippingModal(false)}
                                className="px-4 py-2 bg-gray rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmShippingStatusChange}
                                className="px-4 py-2 bg-purpledark text-white rounded-md hover:bg-green-600"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DashProducts