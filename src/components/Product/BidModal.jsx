'use client'
import React from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";
const BidModal = ({ handleCloseModal, handleConfirm }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 relative ">
                <h3 className="text-xl font-bold mb-4">Place Your Bid</h3>
                <div className='flex justify-between items-center mt-6'>
                    <h1 className='text-purplelight font-bold text-20'>Product Title</h1>
                    <h1 className='text-blackish font-semibold text-18'>Canon Camera</h1>
                </div>
                <div className='flex justify-between items-center mt-6'>
                    <h1 className='text-purplelight font-bold text-20'>Auction Price</h1>
                    <h1 className='text-blackish font-semibold text-18'><span className='text-14'>Starting From</span> 130,0000</h1>
                </div>
                <div className='flex justify-between items-center mt-6'>
                    <h1 className='text-purplelight font-bold text-20'>Seller Name</h1>
                    <h1 className='text-blackish font-semibold text-18'>Ahsan</h1>
                </div>
                <div className='flex justify-between items-center mt-6'>
                    <h1 className='text-purplelight font-bold text-20'>Location</h1>
                    <h1 className='text-blackish font-semibold text-18'>Lahore,Punjab</h1>
                </div>
                <div className='flex flex-col mt-6'>
                    <h1 className='text-purplelight font-bold text-20'>Product Description</h1>
                    <p className='mt-4 text-blackish'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, doloremque vel provident saepe corrupti nisi.</p>
                    <p className='text-blackish mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur totam repellat adipisci esse!</p>
                </div>

                <input type="text" className='py-4 mt-5 px-3 text-18 bg-transparent border border-purplelight rounded-md w-full' placeholder='Enter Your Bid' />
                <button onClick={handleConfirm}  className='py-4 text-center text-18 font-semibold text-white bg-purplelight w-full mt-6'>Confirm</button>


                <IoMdCloseCircleOutline onClick={handleCloseModal} size={25} className='absolute top-6 right-6 text-black' />
            </div>
        </div>
    )
}

export default BidModal