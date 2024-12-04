'use client';
import { fetchCategories } from '@/Store/Actions/userActions';
import { API_URL, getAuthHeaders } from '@/utils/apiUrl';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosCloseCircle } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

const AddNewProduct = ({ user }) => {
  const [formData, setFormData] = useState({
    productName: '',
    productCompany: '',
    productType: 'new', // "new" or "old"
    price: '',
    location: '',
    productCategory: '',
    images: [],
    startDate: '',
    endDate: '',
    description1: '',
    description2: '',
    description3: '',
  });
  const { categories } = useSelector((state) => state.categories)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories())

  }, [dispatch])

  const [imageLink, setImageLink] = useState(''); // Temporary image link input

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addImageLink = () => {
    if (imageLink.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, imageLink],
      });
      setImageLink('');
    }
  };
  const removeImage = (indexToRemove) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, index) => index !== indexToRemove),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        sellerId: user?._id
      }

      const { data } = await axios.post(`${API_URL}/seller/add-product`, payload, getAuthHeaders())
      // console.log(data)
      if (data?.success) {
        setFormData({
          productName: '',
          productCompany: '',
          productType: 'new', // "new" or "old"
          price: '',
          location: '',
          productCategory: '',
          images: [],
          startDate: '',
          endDate: '',
          description1: '',
          description2: '',
          description3: '',
        })
      }
      toast.success(data?.message)

    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }



    // console.log('Product Data:', formData);
    // alert('Product added successfully!');

    // TODO: Add API call logic here to submit the product
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Add New Product for Auction</h1>
      <form onSubmit={handleSubmit} className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border border-purple bg-transparent px-3 py-2.5 rounded"
            />
          </div>

          {/* Product Company */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Product Company</label>
            <input
              type="text"
              name="productCompany"
              value={formData.productCompany}
              onChange={handleChange}
              placeholder="Enter product company"
              className="w-full border border-purple bg-transparent px-3 py-2.5 rounded"
            />
          </div>

          {/* Product Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Is it Old or New?</label>
            <select
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              className="w-full border border-purple bg-transparent px-3 py-2.5 rounded"
            >
              <option value="new">New</option>
              <option value="used">Old</option>
            </select>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full border border-purple bg-transparent px-3 py-2.5 rounded"
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="w-full border border-purple bg-transparent px-3 py-2.5 rounded"
            />
          </div>

          {/* Product Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Product Category</label>
            <select
              name="productCategory"
              value={formData.productCategory}
              onChange={handleChange}
              className="w-full border border-purple bg-transparent px-3 py-2.5 rounded"
            >
              {categories?.map((cat, index) => (
                <option key={index} value={cat?._id}>
                  {cat?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border border-purple bg-transparent px-3 py-2.5 rounded"
            />
          </div>

          {/* End Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">End Date</label>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border border-purple bg-transparent px-3 py-2.5 rounded"
            />
          </div>

          {/* Description Fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description 1</label>
            <textarea
              name="description1"
              value={formData.description1}
              onChange={handleChange}
              placeholder="Enter description 1"
              className="w-full border border-purple bg-transparent px-3 py-2.5 rounded"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description 2</label>
            <textarea
              name="description2"
              value={formData.description2}
              onChange={handleChange}
              placeholder="Enter description 2"
              className="w-full border border-purple bg-transparent px-3 py-2.5 rounded"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description 3</label>
            <textarea
              name="description3"
              value={formData.description3}
              onChange={handleChange}
              placeholder="Enter description 3"
              className="w-full border border-purple bg-transparent px-3 py-2.5 rounded"
            ></textarea>
          </div>

        </div>
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
              <div className=' h-20 w-20 relative'>
                <img src={link} alt="images" className='h-full w-full object-cover' />
                <IoIosCloseCircle size={24} onClick={() => removeImage(index)} className='text-red absolute -top-2 -right-2 cursor-pointer' />

              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="w-full bg-green text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNewProduct;
