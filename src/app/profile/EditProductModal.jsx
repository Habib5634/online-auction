'use client';
import { API_URL, getAuthHeaders } from '@/utils/apiUrl';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosCloseCircle, IoMdCloseCircleOutline } from 'react-icons/io';

const EditProductModal = ({ selectedProduct, closeModal, handleUpdateProduct }) => {
  const [formData, setFormData] = useState({
    productName: selectedProduct.productName || '',
    productCompany: selectedProduct.productCompany || '',
    location: selectedProduct.location || '',
    productType: selectedProduct.productType || 'new',
    price: selectedProduct.price || '',
    description1: selectedProduct.description1 || '',
    description2: selectedProduct.description2 || '',
    description3: selectedProduct.description3 || '',
    isOpen: selectedProduct.isOpen || true,
    endDate: selectedProduct.endDate || '', // Format for date input
    images: selectedProduct.images || [], // Array of URLs
  });
  const [imageLink, setImageLink] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const addImageLink = () => {
    if (imageLink.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, imageLink.trim()],
      }));
      setImageLink('');
    }
  };

  const removeImage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // handleUpdateProduct(formData);
    console.log("updatedForm data",formData)
    try {
      const {data} = axios?.put(`${API_URL}/seller/product/${selectedProduct?._id}`,formData,getAuthHeaders());
      if(data.success){
        toast.success(data?.message)
        closeModal()
      }else{
        toast.error(data?.message)
        closeModal()
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
      closeModal()
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 relative h-full max-h-[90vh] overflow-auto">
        <h3 className="text-xl font-bold mb-4">Edit Product</h3>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <label htmlFor="productName" className="font-bold text-blackish">Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full py-2 px-4 bg-transparent ring-2 ring-purple rounded-md"
            />
          </div>

          <div className="flex flex-col gap-3 mt-3">
            <label htmlFor="productCompany" className="font-bold text-blackish">Company</label>
            <input
              type="text"
              name="productCompany"
              value={formData.productCompany}
              onChange={handleChange}
              className="w-full py-2 px-4 bg-transparent ring-2 ring-purple rounded-md"
            />
          </div>

          <div className="flex flex-col gap-3 mt-3">
            <label htmlFor="location" className="font-bold text-blackish">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full py-2 px-4 bg-transparent ring-2 ring-purple rounded-md"
            />
          </div>

          <div className="flex flex-col gap-3 mt-3">
            <label htmlFor="productType" className="font-bold text-blackish">Product Type</label>
            <select
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              className="w-full py-2 px-4 bg-transparent ring-2 ring-purple rounded-md"
            >
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 mt-3">
            <label htmlFor="price" className="font-bold text-blackish">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full py-2 px-4 bg-transparent ring-2 ring-purple rounded-md"
            />
          </div>

          <div className="flex flex-col gap-3 mt-3">
            <label htmlFor="description1" className="font-bold text-blackish">Description 1</label>
            <textarea
              name="description1"
              value={formData.description1}
              onChange={handleChange}
              className="w-full py-2 px-4 bg-transparent ring-2 ring-purple rounded-md"
            />
          </div>

          <div className="flex flex-col gap-3 mt-3">
            <label htmlFor="description2" className="font-bold text-blackish">Description 2</label>
            <textarea
              name="description2"
              value={formData.description2}
              onChange={handleChange}
              className="w-full py-2 px-4 bg-transparent ring-2 ring-purple rounded-md"
            />
          </div>

          <div className="flex flex-col gap-3 mt-3">
            <label htmlFor="description3" className="font-bold text-blackish">Description 3</label>
            <textarea
              name="description3"
              value={formData.description3}
              onChange={handleChange}
              className="w-full py-2 px-4 bg-transparent ring-2 ring-purple rounded-md"
            />
          </div>

          <div className="flex flex-col gap-3 mt-3">
            <label htmlFor="endDate" className="font-bold text-blackish">End Date</label>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate ? formData.endDate.slice(0, 16) : ''}
              onChange={handleChange}
              className="w-full py-2 px-4 bg-transparent ring-2 ring-purple rounded-md"
            />
          </div>

           {/* Image Links Section */}
           <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Image Links</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
                placeholder="Enter image link"
                className="flex-1 border border-purple bg-transparent px-3 py-2.5 rounded"
              />
              <button
                type="button"
                onClick={addImageLink}
                className="bg-blue text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap items-center my-6 gap-4">
              {formData.images.map((link, index) => (
                <div className="h-20 w-20 relative" key={index}>
                  <img src={link} alt="Preview" className="h-full w-full object-cover" />
                  <IoIosCloseCircle
                    size={24}
                    onClick={() => removeImage(index)}
                    className="text-red absolute -top-2 -right-2 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="py-2 px-4 text-white bg-purple rounded-md mt-4">Update</button>
        </form>

        <IoMdCloseCircleOutline onClick={closeModal} size={25} className="absolute top-6 right-6 text-black" />
      </div>
    </div>
  );
};

export default EditProductModal;
