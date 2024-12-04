'use client'
import { addBidOnProduct } from '@/Store/Actions/userActions';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
const BidModal = ({ handleCloseModal, handleConfirm, product }) => {
    const [bidPrice, setBidPrice] = useState('');
    const { isLoading, error, successMessage } = useSelector((state) => state.bids);
    const { userData } = useSelector((state) => state.userData)
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData?._id === product?.sellerId?._id) {
            toast.error("You are the seller of this product. You cant place bi on this product")
            handleCloseModal()
        } else {

            try {
                dispatch(addBidOnProduct({ productId: product?._id, bidPrice }));
                console.log(successMessage)
                if (!isLoading && successMessage === 'Bid Added successfully') {
                    toast.success(successMessage)
                    setBidPrice("")
                    handleCloseModal()
                } else {
                    toast.error(successMessage)
                    handleCloseModal()
                }
                
            } catch (error) {
                handleCloseModal()
                console.log(error)
            }
        }
    };
   

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 relative ">
                <h3 className="text-xl font-bold mb-4">Place Your Bid</h3>
                <div className='flex justify-between items-center mt-6'>
                    <h1 className='text-purplelight font-bold text-20'>Product Title</h1>
                    <h1 className='text-blackish font-semibold text-18'>{product?.productName}</h1>
                </div>
                <div className='flex justify-between items-center mt-6'>
                    <h1 className='text-purplelight font-bold text-20'>Auction Price</h1>
                    <h1 className='text-blackish font-semibold text-18'><span className='text-14'>Starting From</span> {product?.price}</h1>
                </div>
                <div className='flex justify-between items-center mt-6'>
                    <h1 className='text-purplelight font-bold text-20'>Seller Name</h1>
                    <h1 className='text-blackish font-semibold text-18'>{product?.sellerId?.fullName}</h1>
                </div>
                <div className='flex justify-between items-center mt-6'>
                    <h1 className='text-purplelight font-bold text-20'>Location</h1>
                    <h1 className='text-blackish font-semibold text-18'>{product?.location}</h1>
                </div>
                <div className='flex flex-col mt-6'>
                    <h1 className='text-purplelight font-bold text-20'>Product Description</h1>
                    {product?.description1 && <p className='mt-4 text-blackish'>{product?.description1}</p>}
                    {product?.description2 && <p className='text-blackish mt-4'>{product?.description2}</p>}
                    {product?.description3 && <p className='text-blackish mt-4'>{product?.description3}</p>}
                </div>

                <input type="text" className='py-4 mt-5 px-3 text-18 bg-transparent border border-purplelight rounded-md w-full' placeholder='Enter Your Bid' name='bidPrice' onChange={(e) => setBidPrice(e.target.value)} />
                <button onClick={handleSubmit} className='py-4 text-center text-18 font-semibold text-white bg-purplelight w-full mt-6'>{isLoading ?"Addind Your Bid...":"Confirm"}</button>


                <IoMdCloseCircleOutline onClick={handleCloseModal} size={25} className='absolute top-6 right-6 text-black' />
            </div>
        </div>
    )
}

export default BidModal