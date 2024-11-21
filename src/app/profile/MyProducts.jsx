'use client'
import React, { useState } from "react";
// import SuubmittedApplicationModal from "./SuubmittedApplicationModal";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import EditProductModal from "./EditProductModal";
// import ProposalDetailModal from "./ProposalDetaillModal";

const MyProducts    = () => {
  // Dummy data
  const applications = [
    { id: 1, jobTitle: "Bike", company: "TechCorp", date: "2024-11-01", status: "Accepted",img:'assets/bike.png',price:'130,0000', },
    { id: 2, jobTitle: "Car", company: "Innovatech", date: "2024-11-05", status: "Rejected",img:'assets/car.png',price:'130,0000', },
    { id: 3, jobTitle: "Laptop", company: "Designify", date: "2024-11-10", status: "Pending",img:'assets/laptop.png',price:'130,0000', },
    { id: 4, jobTitle: "Airpods", company: "QualityPro", date: "2024-11-12", status: "Accepted",img:'assets/airpods.png',price:'130,0000', },
    { id: 5, jobTitle: "Gaming Chair", company: "ManageWell", date: "2024-11-15", status: "Pending",img:'assets/chair.png',price:'130,0000', },
  ];
  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold clicked application details
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationModal,setConfirmationModal]=useState(false)
const router = useRouter()
  const handleEditProduct = (app) => {
    setSelectedProduct(app); // Set the clicked application data
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedProduct(null); // Clear selected application
};
const handleOpenConfirmationModal = ()=>{
     

    setConfirmationModal(true)
  }

  const handleCloseConfirmationModal = ()=>{
    setConfirmationModal(false)
  }
  const handleGiveTest = ()=>{
alert('product deleted')
    setConfirmationModal(false)
  }
  return (
    <>
    <div className="w-full overflow-x-auto bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Products</h2>
      <table className="table-auto w-full border-collapse border border-darkgray">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-darkgray px-4 py-2 text-left">Image</th>
            <th className="border border-darkgray px-4 py-2 text-left">Title</th>
            <th className="border border-darkgray px-4 py-2 text-left">Price</th>
            <th className="border border-darkgray px-4 py-2 text-left">Status</th>
            <th className="border border-darkgray px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-100">
              <td className="border border-darkgray px-4 py-2">
                
                <img src={app.img} alt={app.jobTitle} className="h-10 w-10" />
                </td>
              <td className="border border-darkgray px-4 py-2">{app.jobTitle}</td>
              <td className="border border-darkgray px-4 py-2">{app.price}</td>
              <td className="border border-darkgray px-4 py-2">{app.date}</td>
              <td className="border border-darkgray px-4 py-[18px]  flex items-center justify-center gap-2">
              <MdEdit className="text-purple" size={20} onClick={()=>handleEditProduct(app)} /> <FaTrashAlt onClick={handleOpenConfirmationModal} className=" text-red" size={20} />
              </td>
            </tr>
          ))}
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

{confirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 relative ">

          <h1 className="text-2xl font-bold text-blackish text-center mb-4">Are you Sure! You want to delete Product</h1>
       
        
        <div className="flex justify-center items-center gap-10 w-full">


        <button
          className="bg-green text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={handleGiveTest}
          >
          Delete
        </button>
        <button
          className="bg-red text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={handleCloseConfirmationModal}
          >
         Keep
        </button>
              </div>
            </div>
        </div>
      )}
                </>
  );
};

export default MyProducts;
