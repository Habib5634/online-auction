'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_URL, getAuthHeaders } from "@/utils/apiUrl";
import useCountdowns from "@/hooks/useCoundown";
import { IoMdCloseCircleOutline } from "react-icons/io";
import useSingleCountdown from "@/hooks/useSingleCoundown";
import toast from "react-hot-toast";

const MyProposals = () => {

  const [selectedBid, setSelectedBid] = useState(null); // State to hold clicked application details
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bids, setBids] = useState([])
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(false)
  const router = useRouter()

  const fetchBids = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${API_URL}/user/product/get-user-bids`, getAuthHeaders())
      setBids(data?.userBids)
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBids()
  }, [])

  const handleRowClick = (app) => {
    setSelectedBid(app); // Set the clicked application data
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedBid(null); // Clear selected application
  };
  const handleOpenConfirmationModal = () => {
    setIsModalOpen(false); // Close the modal

    setConfirmationModal(true)
  }

  const handleCloseConfirmationModal = () => {
    setConfirmationModal(false)
  }
  const handleGiveTest = () => {
    router.push('/skill-test')
    setConfirmationModal(false)
  }
  const endDates = bids?.map((bid) => bid?.productId?.endDate);
  const countdowns = useCountdowns(endDates);
  return (
    <>
      <div className="w-full overflow-x-auto bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Submitted Applications</h2>
        <table className="table-auto w-full border-collapse border border-darkgray">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-darkgray px-4 py-2 text-left">Image</th>
              <th className="border border-darkgray px-4 py-2 text-left">Title</th>
              <th className="border border-darkgray px-4 py-2 text-left">Company</th>
              <th className="border border-darkgray px-4 py-2 text-left">Seller Name</th>
              <th className="border border-darkgray px-4 py-2 text-left">Seller Contact</th>
              <th className="border border-darkgray px-4 py-2 text-left">Seller Email</th>
              <th className="border border-darkgray px-4 py-2 text-left">Auction Price</th>
              <th className="border border-darkgray px-4 py-2 text-left">Your Bid</th>
              <th className="border border-darkgray px-4 py-2 text-left">Auction Ends In</th>
              <th className="border border-darkgray px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          {loading ? "Fetching Bids..." :
            <tbody>
              {bids?.map((bid, index) => {
                const timeLeft = countdowns[index];
                return (
                  <tr onClick={() => handleRowClick(bid)} key={bid._id} className="hover:bg-gray-100">
                    <td className="border border-darkgray px-4 py-2">

                      <img src={bid?.productId?.images[0]} alt={bid.productId?.productName} className="h-10 w-10" />
                    </td>
                    <td className="border border-darkgray text-nowrap overflow-hidden text-ellipsis px-4 py-2">{bid.productId?.productName}</td>
                    <td className="border border-darkgray text-nowrap overflow-hidden text-ellipsis px-4 py-2">{bid.productId?.productCompany}</td>
                    <td className="border border-darkgray text-nowrap overflow-hidden text-ellipsis px-4 py-2">{bid.productId?.sellerId?.fullName}</td>
                    <td className="border border-darkgray text-nowrap overflow-hidden text-ellipsis px-4 py-2">{bid?.productId?.sellerId?.contact}</td>
                    <td className="border border-darkgray text-nowrap overflow-hidden text-ellipsis px-4 py-2">{bid?.productId?.sellerId?.email}</td>
                    <td className="border border-darkgray text-nowrap overflow-hidden text-ellipsis px-4 py-2">{bid?.productId?.price}</td>
                    <td className="border border-darkgray text-nowrap overflow-hidden text-ellipsis px-4 py-2">{bid?.bidPrice}</td>
                    <td className="border border-darkgray text-nowrap overflow-hidden text-ellipsis px-4 py-2">

                      {(bid?.isOpen && timeLeft) ? (
                        <span>
                          {timeLeft.days > 0 && `${timeLeft.days}d `}
                          {timeLeft.hours > 0 && `${timeLeft.hours}h `}
                          {timeLeft.minutes}m {timeLeft.seconds}s
                        </span>
                      ) : (
                        "Ended"
                      )}
                    </td>
                    <td
                      className={`border border-darkgray px-4 py-2 ${bid.bidStatus === "winner"
                        ? "text-green font-bold"
                        : bid.status === "closed"
                          ? "text-red font-bold"
                          : "text-yellow font-bold"
                        }`}
                    >
                      {bid.bidStatus}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          }
        </table>
      </div>
      {isModalOpen &&
        <ProposalDetailModal
          selectedBid={selectedBid}
          closeModal={closeModal}
          handleOpenConfirmationModal={handleOpenConfirmationModal}
        />
      }

      {confirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 relative ">

            <h1 className="text-2xl font-bold text-blackish mb-4">Before You Start the Test</h1>
            <ul className="list-disc list-inside text-blaskish2 text-left mb-6">
              <li>You cannot change the tab during the test.</li>
              <li>You must complete the test within the allocated time.</li>
            </ul>
            <p className="text-blackish mb-4">Are you ready to give the test?</p>
            <div className="flex justify-between items-center w-full">


              <button
                className="bg-green text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={handleGiveTest}
              >
                Start Test
              </button>
              <button
                className="bg-red text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={handleCloseConfirmationModal}
              >
                Not Yet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyProposals;



const ProposalDetailModal = ({ selectedBid, closeModal, handleOpenConfirmationModal }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeLeft = (selectedBid?.bidStatus !== "winner" && selectedBid?.bidStatus !== "closed")
    ? useSingleCountdown(selectedBid?.productId?.endDate)
    : null;


  // Function to go to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedBid?.productId?.images.length);
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? selectedBid?.productId?.images.length - 1 : prevIndex - 1
    );
  };

  const handleConfirmPayment = async () => {
    try {

      const payload = {
        sellerId: selectedBid.productId?.sellerId._id,
        productId: selectedBid?.productId?._id,
        amount: selectedBid?.bidPrice
      }
      const response = await axios.post(`${API_URL}/user/transactions`, payload, getAuthHeaders())
      console.log(response)
      if(response.status=== 201){
        toast.success("You have confirmed please wait for seller confirmation")
        closeModal()
      }
    } catch (error) {
      console.log(error)
      closeModal()
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 relative ">
        <h3 className="text-xl font-bold mb-4">Bid Details</h3>
        <div className="relative w-full max-w-md mx-auto">
          {/* Image */}
          <div className="w-full h-64">
            <img
              src={selectedBid?.productId?.images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          {/* Buttons */}
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black text-white px-3 py-1 rounded-full hover:bg-gray-800"
          >
            Prev
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black text-white px-3 py-1 rounded-full hover:bg-gray-800"
          >
            Next
          </button>

          {/* Dots for navigation */}
          <div className="flex justify-center mt-4">
            {selectedBid?.productId?.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 mx-1 rounded-full ${index === currentIndex ? "bg-black" : "bg-gray-400"
                  }`}
              ></button>
            ))}
          </div>
        </div>
        <div className="w-full max-w-md mx-auto ">

          <p className="flex justify-between items-center"><strong>Product Name:</strong> {selectedBid?.productId?.productName}</p>
          <p className="flex justify-between items-center"><strong>Product Company:</strong> {selectedBid?.productId?.productCompany}</p>
          <p className="flex justify-between items-center"><strong>Product Proce:</strong> {selectedBid?.productId?.price}</p>
          <p className="flex justify-between items-center"><strong>Location:</strong> {selectedBid?.productId?.location}</p>
          <p className="flex justify-between items-center"><strong>Product Status:</strong> {selectedBid?.bidStatus ? "Opened" : "Closed"}</p>
          <p className="flex justify-between items-center"><strong>Auction Start Date and Time:</strong> {selectedBid?.productId?.startDate
            ? new Date(selectedBid.productId?.startDate).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })
            : 'N/A'}</p>
          <p className="flex justify-between items-center"><strong>Auction End Date and Time:</strong> {selectedBid?.productId?.endDate
            ? new Date(selectedBid.productId?.endDate).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })
            : 'N/A'}</p>
          {timeLeft ? (
            <div className="text-center w-full">
              {timeLeft.days > 0 && <span>{timeLeft.days} day(s) </span>}
              {timeLeft.hours > 0 && <span>{timeLeft.hours} hr(s) </span>}
              <span>{timeLeft.minutes} min(s) </span>
              <span>{timeLeft.seconds} sec(s)</span>
            </div>
          ) : (
            "Auction Ended"
          )}
        </div>

        {selectedBid.bidStatus === 'winner' &&
          <div className="flex flex-col">
            <h1 className="font-bold mb-4">You are the winner of this bid</h1>
            <p>Please contact seller and send the payment</p>

            <h4 className="mt-6">I have sended the payment</h4>
            <button className="py-2 px-4 rounde-lg bg-green text-white mt-4" onClick={handleConfirmPayment}>Confirm</button>
          </div>
        }


        <IoMdCloseCircleOutline onClick={closeModal} size={25} className='absolute top-6 right-6 text-black' />
      </div>
    </div>
  )
}

