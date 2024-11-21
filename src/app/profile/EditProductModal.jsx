'use client'
import React from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'

const EditProductModal = ({selectedProduct,closeModal,handleOpenConfirmationModal}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 relative ">
      <h3 className="text-xl font-bold mb-4">Product Details</h3>

    <form >
    <div className='flex flex-col gap-3'>
          <label htmlFor="title" className='text-20 font-bold text-blackish'>Title</label>
            <input type="text" name="title" placeholder='Product Name' value={selectedProduct.jobTitle} className='w-full max-w-xs py-2.5 px-4 focus:outline bg-transparent  ring-2 ring-purple rounded-md ' />

        </div>
    <div className='flex flex-col gap-3 mt-3'>
          <label htmlFor="price" className='text-20 font-bold text-blackish'>Price</label>
            <input type="text" name="title" placeholder='Product Name' value={selectedProduct.price} className='w-full max-w-xs py-2.5 px-4 focus:outline bg-transparent  ring-2 ring-purple rounded-md ' />

        </div>
    {/* <div className='flex flex-col gap-3'>
          <label htmlFor="age" className='text-20 font-bold text-blackish'>Title</label>
            <input type="text" name="title" placeholder='Product Name' value={selectedProduct.jobTitle} className='w-full max-w-xs py-2.5 px-4 focus:outline bg-transparent  ring-2 ring-purple rounded-md ' />

        </div> */}
        <button className='py-2 px-4 text-white bg-purple rounded-md mt-4' onClick={closeModal}>Update </button>
    </form>
   
      <IoMdCloseCircleOutline onClick={closeModal} size={25} className='absolute top-6 right-6 text-black' />
    </div>
  </div>
  )
}

export default EditProductModal
