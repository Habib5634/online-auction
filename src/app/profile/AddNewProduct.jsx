'use client'
import React, { useState } from 'react'

const AddNewProduct = () => {
    const [formData, setFormData] = useState({
        title: "",
        productCompany: "",
        isOld: "new", // "new" or "old"
        price: "",
        location: "",
        category: "",
        imageLinks: [],
        desc1: "",
        desc2: "",
        desc3: "",
      });
    
      const [imageLink, setImageLink] = useState(""); // Temporary image link input
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const addImageLink = () => {
        if (imageLink.trim()) {
          setFormData({
            ...formData,
            imageLinks: [...formData.imageLinks, imageLink],
          });
          setImageLink("");
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Product Data:", formData);
        // You can add an API call here to submit the data
        alert("Product added successfully!");
      };
    
  return (
    <div>
      Add New Product
      <form
      onSubmit={handleSubmit}
      className=""
    >
      <h1 className="text-xl font-bold mb-4">Add New Product for Auction</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter product title"
          className="w-full border border-purple bg-transparent px-3 py-2.5 rounded"
          />
      </div>

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

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Is it Old or New?</label>
        <select
          name="isOld"
          value={formData.isOld}
          onChange={handleChange}
          className="w-full border border-purple bg-transparent px-3 py-2.5 rounded"
          >
          <option value="new">New</option>
          <option value="old">Old</option>
        </select>
      </div>

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

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-purple bg-transparent px-3 py-2.5 rounded"
          >
          <option value="">Select category</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
          <option value="vehicles">Vehicles</option>
          <option value="clothing">Clothing</option>
          <option value="other">Other</option>
        </select>
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
        <ul className="mt-2">
          {formData.imageLinks.map((link, index) => (
              <li key={index} className="text-sm text-gray-600">
              {link}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description 1</label>
        <textarea
          name="desc1"
          value={formData.desc1}
          onChange={handleChange}
          placeholder="Enter description 1"
          className="w-full border border-purple bg-transparent px-3 py-2.5 rounded"
          ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description 2</label>
        <textarea
          name="desc2"
          value={formData.desc2}
          onChange={handleChange}
          placeholder="Enter description 2"
          className="w-full border border-purple bg-transparent px-3 py-2.5 rounded"
          ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description 3</label>
        <textarea
          name="desc3"
          value={formData.desc3}
          onChange={handleChange}
          placeholder="Enter description 3"
          className="w-full border border-purple bg-transparent px-3 py-2.5 rounded"
          ></textarea>
      </div>

      </div>
      <button
        type="submit"
        className="w-full bg-green text-white px-4 py-2 rounded"
        >
        Submit
      </button>
    </form>
    </div>
  )
}

export default AddNewProduct
