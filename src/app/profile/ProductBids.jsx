'use client'
import { API_URL, getAuthHeaders } from '@/utils/apiUrl';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';

const RecievedBids = () => {
  
    const [bids, setBids] = useState(null)
    const [loading, setLoading] = useState(false);
const [selectedBid,setSelectedBid] = useState(null)
const [isModalOpen, setIsModalOpen] = useState(false);
    const fetchProductBids = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/seller/get-product-bids`, getAuthHeaders());

            setBids(response?.data?.bids);

            // Show success toast only once
            if (response?.data?.bids?.length === 0) {
                toast.success("No Bids");

            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductBids();
    }, []);
    // Function to handle status update
    const handleUpdateStatus = async (bidId, newStatus) => {
        try {
            const response = await axios.put(
                `${API_URL}/seller/bid/status/`,
                { bidId, newStatus },
                getAuthHeaders()
            );
            if (response.data.success) {
                toast.success(response.data.message || "Bid status updated successfully!");
                fetchProductBids();
                setIsModalOpen(false)
            } else {
                toast.error(response.data.message || "Failed to update application status.");
            }
        } catch (error) {
            console.error(error);
            toast.error(
                error?.response?.data?.message || "An error occurred while updating the status."
            );
        }
    };

    const handleSelectBids = (app)=>{
        setSelectedBid(app)
        setIsModalOpen(true)
    }
    const handleCloseModel = ()=>{
        setIsModalOpen(false)
        setSelectedBid(null)
    }
   
    return (
        <div className="max-w-5xl mx-auto mt-8 p-6 overflow-x-auto shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Received Job Bids</h2>
            <table className="w-full border-collapse border border-darkgray">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-darkgray px-4 py-2 text-left">#</th>
                        <th className="border border-darkgray px-4 py-2 text-left">Product Name</th>
                        <th className="border border-darkgray px-4 py-2 text-left">Bidder Name</th>
                        <th className="border border-darkgray px-4 py-2 text-left">Bidder Email</th>
                        <th className="border border-darkgray px-4 py-2 text-left">Product Price</th>
                        <th className="border border-darkgray px-4 py-2 text-left">Bid Price</th>
                        <th className="border border-darkgray px-4 py-2 text-left">Application Status</th>
                        <th className="border border-darkgray px-4 py-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bids?.length > 0 && bids?.map((bid, index) => (
                        <tr key={bid._id} className="hover:bg-lightgray">
                            <td onClick={()=>handleSelectBids(bid)} className="border border-darkgray px-4 py-2">{index + 1}</td>
                            <td onClick={()=>handleSelectBids(bid)} className="border w-full max-w-[150px] text-nowrap overflow-hidden text-ellipsis border-darkgray px-4 py-2">{bid?.productId?.productName}</td>
                            <td onClick={()=>handleSelectBids(bid)} className="border w-full max-w-[150px] text-nowrap overflow-hidden text-ellipsis border-darkgray px-4 py-2">{bid?.bidderId?.fullName}</td>
                            <td onClick={()=>handleSelectBids(bid)} className="border w-full max-w-[150px] text-nowrap overflow-hidden text-ellipsis border-darkgray px-4 py-2">{bid?.bidderId?.email}</td>
                            <td onClick={()=>handleSelectBids(bid)} className="border border-darkgray px-4 py-2 w-full max-w-[150px] text-nowrap overflow-hidden text-ellipsis">{bid?.productId?.price}</td>
                            <td onClick={()=>handleSelectBids(bid)} className="border border-darkgray px-4 py-2 w-full max-w-[150px] text-nowrap overflow-hidden text-ellipsis">{bid?.bidPrice}</td>
                            
                            <td
                                className={`border border-darkgray px-4 py-2 ${bid?.bidStatus === 'winner'
                                        ? 'text-green'
                                        : bid?.bidStatus === 'closed'
                                            ? 'text-red'
                                            : 'text-yellow'
                                    }`}
                            >
                                {bid?.bidStatus}
                            </td>
                            <td className="border border-darkgray px-4 py-2 flex items-center space-x-4">
                {bid?.bidStatus === "running" ? (
                  <>
                    <FaCheck
                      title="Set User Winner"
                      className="text-green cursor-pointer"
                      onClick={() => handleUpdateStatus(bid._id, "winner")}
                    /> 
                    <span>-</span>
                    <IoCloseSharp
                      title="closed"
                      className="text-red cursor-pointer"
                      size={20}
                      onClick={() => handleUpdateStatus(bid._id, "closed")}
                    />
                  </>
                ) : (
                  "-"
                )}
              </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isModalOpen && <BidDetailModal 
            selectedBid={selectedBid}
            handleCloseModel={handleCloseModel}
            handleUpdateStatus={handleUpdateStatus}
            />}
        </div>
    )
}

export default RecievedBids


const BidDetailModal = ({handleCloseModel,selectedBid,handleUpdateStatus}) => {
    console.log(selectedBid)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 relative ">
        <h3 className="text-xl font-bold mb-4">Application Details</h3>
        <div className='flex flex-col gap-3'>
  
        <p><strong>Product Name:</strong> {selectedBid?.productId?.productName}</p>
        <p><strong>Company:</strong> {selectedBid?.productId?.location}</p>
        <p><strong>Full Name:</strong> {selectedBid?.bidderId?.fullName}</p>
        <p><strong>Email:</strong> {selectedBid?.bidderId?.email}</p>
        <p><strong>Experience:</strong> {selectedBid?.bidderId?.contact}</p>
        <p><strong>Contact:</strong> {selectedBid?.productId?.price}</p>
        <p><strong>Qualification:</strong> {selectedBid?.bidPrice}</p>
        <p><strong>Qualification:</strong> {selectedBid?.bidStatus}</p>
        </div>
        {selectedBid?.bidStatus === "running" ? 
        <div className='flex justify-center items-center gap-4 mt-4'>
            <button onClick={() => handleUpdateStatus(selectedBid._id, "winner")} className='px-4 py-2 rounded-md text-white bg-blackish'>Set User Winner </button>
            <button onClick={() => handleUpdateStatus(selectedBid._id, "closed")} className='px-4 py-2 rounded-md text-white bg-red'>Close Bid For This User</button>
        </div>
        :null}
        
     
        <IoMdCloseCircleOutline onClick={handleCloseModel} size={25} className='absolute top-6 right-6 text-black' />
      </div>
    </div>
    )
  }
  