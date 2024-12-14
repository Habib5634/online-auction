'use client'
import React, { useEffect, useState } from "react";
// import SuubmittedApplicationModal from "./SuubmittedApplicationModal";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import EditProductModal from "./EditProductModal";
import axios from "axios";
import { API_URL, getAuthHeaders } from "@/utils/apiUrl";
import { IoMdCloseCircleOutline } from "react-icons/io";
import useCountdown from "@/hooks/useCoundown";
import useCountdowns from "@/hooks/useCoundown";
import useSingleCountdown from "@/hooks/useSingleCoundown";
import toast from "react-hot-toast";
// import ProposalDetailModal from "./ProposalDetaillModal";

const MyProducts = () => {

  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold clicked application details
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false)
  const [productDetailModal, setProductdetailModal] = useState(false)
  const [productId, setProductId] = useState('')
  const router = useRouter()
  const [products, setProducts] = useState([])
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/seller/posted-products/`, getAuthHeaders())

      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])


  const handleEditProduct = (app) => {
    setSelectedProduct(app); // Set the clicked application data
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedProduct(null); // Clear selected application
  };
  const handleOpenConfirmationModal = (id) => {
    setConfirmationModal(true)
    setProductId(id)
  }

  const handleCloseConfirmationModal = () => {
    setConfirmationModal(false)
    setProductId('')
  }
  const handleCloseProduct = async () => {
    console.log(productId)
    try {
      const { data } = await axios.put(`${API_URL}/seller/close-product-bids/${productId}`, {}, getAuthHeaders())
      if (data.success) {
        toast.success(data?.message)
        setConfirmationModal(false)
        setProductId('')
        fetchProducts()
      } else {
        toast.error(data.message)
        setConfirmationModal(false)
        setProductId('')
      }

    } catch (error) {
      console.log(error)
      setConfirmationModal(false)
      setProductId('')
    }
  }

  const handleOpenProductDetailModal = (product) => {
    setSelectedProduct(product)
    setProductdetailModal(true)
  }
  const handleCloseProductDetailModal = () => {
    setSelectedProduct(null)
    setProductdetailModal(false)
  }
  const endDates = products?.map((product) => product.endDate);
  const countdowns = useCountdowns(endDates);

  return (
    <>
      <div className="w-full overflow-x-auto bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">My Products</h2>
        <table className="table-auto w-full border-collapse border border-darkgray">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-darkgray px-4 py-2 text-nowrap text-left">Image</th>
              <th className="border border-darkgray px-4 py-2 text-nowrap text-left">Title</th>
              <th className="border border-darkgray px-4 py-2 text-nowrap text-left">Company</th>
              <th className="border border-darkgray px-4 py-2 text-nowrap text-left">Price</th>
              <th className="border border-darkgray px-4 py-2 text-nowrap text-left">Category</th>
              <th className="border border-darkgray px-4 py-2 text-nowrap text-left">Location</th>
              <th className="border border-darkgray px-4 py-2 text-nowrap text-left">Status</th>
              <th className="border border-darkgray px-4 py-2 text-nowrap text-left">Auction Start Date</th>
              <th className="border border-darkgray px-4 py-2 text-nowrap text-left">Auction Ends In</th>
              <th className="border border-darkgray px-4 py-2 text-left text-nowrap">Product Type</th>
              <th className="border border-darkgray px-4 py-2 text-nowrap text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => {
              const timeLeft = countdowns[index];
              return (
                <tr key={product._id} className="hover:bg-gray-100">
                  <td onClick={() => handleOpenProductDetailModal(product)} className="border border-darkgray px-4 py-2">

                    <img src={product?.images[0]} alt={product.productName} className="h-10 w-10" />
                  </td>
                  <td onClick={() => handleOpenProductDetailModal(product)} className="w-full max-w-[150px] text-nowrap overflow-hidden text-ellipsis border border-darkgray px-4 py-2">{product?.productName}</td>
                  <td onClick={() => handleOpenProductDetailModal(product)} className="w-full max-w-[150px] text-nowrap overflow-hidden text-ellipsis border border-darkgray px-4 py-2">{product?.productCompany}</td>
                  <td onClick={() => handleOpenProductDetailModal(product)} className="w-full max-w-[150px] text-nowrap overflow-hidden text-ellipsis border border-darkgray px-4 py-2">{product?.price}</td>
                  <td onClick={() => handleOpenProductDetailModal(product)} className="w-full max-w-[150px] text-nowrap overflow-hidden text-ellipsis border border-darkgray px-4 py-2">{product?.productCategory?.name}</td>
                  <td onClick={() => handleOpenProductDetailModal(product)} className="w-full max-w-[150px] text-nowrap overflow-hidden text-ellipsis border border-darkgray px-4 py-2">{product?.location}</td>
                  <td onClick={() => handleOpenProductDetailModal(product)} className="w-full max-w-[150px] text-nowrap overflow-hidden text-ellipsis border border-darkgray px-4 py-2">{product?.isOpen ? "Opened" : "Closed"}</td>
                  <td onClick={() => handleOpenProductDetailModal(product)} className="w-full max-w-[150px] text-nowrap overflow-hidden text-ellipsis border border-darkgray px-4 py-2">{product?.startDate
                    ? new Date(product.startDate).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })
                    : 'N/A'}</td>
                  <td onClick={() => handleCloseProductDetailModal(product)} className="w-full max-w-[150px] text-nowrap overflow-hidden text-ellipsis border border-darkgray px-4 py-2"> {product?.isOpen ? timeLeft ? (
                    <span>
                      {timeLeft.days > 0 && `${timeLeft.days}d `}
                      {timeLeft.hours > 0 && `${timeLeft.hours}h `}
                      {timeLeft.minutes}m {timeLeft.seconds}s
                    </span>
                  ) : (
                    "Ended"
                  ) : "Auction Closed"} </td>
                  <td onClick={() => handleCloseProductDetailModal(product)} className="w-full max-w-[150px] text-nowrap overflow-hidden text-ellipsis border border-darkgray px-4 py-2">{product?.productType}</td>
                  <td className="w-full max-w-[150px] text-nowrap overflow-hidden text-ellipsis border border-darkgray px-4 py-[18px]  flex items-center justify-center gap-2">{product?.isOpen ?
                    <>
                      <MdEdit className="text-purple cursor-pointer" size={20} onClick={() => handleEditProduct(product)} /> <FaTrashAlt onClick={() => handleOpenConfirmationModal(product?._id)} className=" text-red cursor-pointer" size={20} />
                    </> : "-"}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {isModalOpen &&
        <EditProductModal
          selectedProduct={selectedProduct}
          closeModal={closeModal}
          handleOpenConfirmationModal={handleOpenConfirmationModal}
        />
      }
      {productDetailModal &&
        <ProductDeatilModal
          closeModal={handleCloseProductDetailModal}
          product={selectedProduct}

        />
      }
      {confirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 relative ">

            <h1 className="text-2xl font-bold text-blackish text-center mb-4">Are you Sure! You want to close this Product on Auction</h1>


            <div className="flex justify-center items-center gap-10 w-full">


              <button
                className="bg-green text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={handleCloseProduct}
              >
                Yes
              </button>
              <button
                className="bg-red text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={handleCloseConfirmationModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyProducts;


const ProductDeatilModal = ({ product, closeModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeLeft = useSingleCountdown(product?.endDate);

  // Function to go to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % product?.images.length);
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? product?.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 relative ">

        <h1 className="text-2xl font-bold text-blackish text-center mb-4">Product Detail</h1>

        <div className="relative w-full max-w-md mx-auto">
          {/* Image */}
          <div className="w-full h-64">
            <img
              src={product?.images[currentIndex]}
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
            {product?.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 mx-1 rounded-full ${index === currentIndex ? "bg-black" : "bg-gray-400"
                  }`}
              ></button>
            ))}
          </div>
        </div>
        <p><strong>Product Name:</strong> {product?.productName}</p>
        <p><strong>Product Company:</strong> {product?.productCompany}</p>
        <p><strong>Product Proce:</strong> {product?.price}</p>
        <p><strong>Product Category:</strong> {product?.productCategory?.name}</p>
        <p><strong>Location:</strong> {product?.location}</p>
        <p><strong>Product Status:</strong> {product?.status ? "Opened" : "Closed"}</p>
        <p><strong>Auction Start Date and Time:</strong> {product?.startDate
          ? new Date(product.startDate).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })
          : 'N/A'}</p>
        <p><strong>Auction End Date and Time:</strong> {product?.endDate}</p>
        <p><strong>Type:</strong> {product?.productType}</p>
        <p><strong>Description:</strong> {product?.description1}</p>
        <p><strong></strong> {product?.description2}</p>
        <p><strong></strong> {product?.description3}</p>
        {!timeLeft ? "Auction Ended" :
          <div>
            {timeLeft.days > 0 && <span>{timeLeft.days} day(s) </span>}
            {timeLeft.hours > 0 && <span>{timeLeft.hours} hr(s) </span>}
            <span>{timeLeft.minutes} min(s) </span>
            <span>{timeLeft.seconds} sec(s)</span>
          </div>
        }
        {product?.bidStatus === 'winner' &&
          <div className="mt-4">
            <h1>You are the <span className="font-semibold">WINNER</span> of this product</h1>
            <p>this is the sellec account infrmation and please transfer the money and submit this </p>

            <form action="">
              <input type="text" name="amount" id="" className="py-2 px-4 rounded-md bg-transparent ring-1 ring-purpledark" />
              <button>I have transferred the money</button>
            </form>

          </div>
        }
        <IoMdCloseCircleOutline onClick={closeModal} size={25} className='absolute top-6 right-6 text-black' />
      </div>
    </div>
  )
}
