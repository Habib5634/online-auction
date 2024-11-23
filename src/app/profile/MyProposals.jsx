'use client'
import React, { useState } from "react";
// import SuubmittedApplicationModal from "./SuubmittedApplicationModal";
import { useRouter } from "next/navigation";
import ProposalDetailModal from "./ProposalDetaillModal";

const MyProposals    = () => {
  // Dummy data
  const applications = [
    { id: 1,img:'/assets/car.png',price:'130,000',yourBid:'150,000', sellerName:'Ahsan', location:'Lahore, Punjab',sellerContact:'+92323 .....',sellerEmail:'seller@example.com', title: "car", company: "Suzuki", date: "2024-11-01", status: "Winner" },
    { id: 2,img:'/assets/bike.png',price:'130,000',yourBid:'150,000', sellerName:'Ahsan', location:'Lahore, Punjab',sellerContact:'+92323 .....',sellerEmail:'seller@example.com', title: "Bike", company: "Yamaha", date: "2024-11-05", status: "Closed" },
    { id: 3,img:'/assets/laptop.png',price:'130,000',yourBid:'150,000', sellerName:'Ahsan', location:'Lahore, Punjab',sellerContact:'+92323 .....',sellerEmail:'seller@example.com', title: "Laptop", company: "HP", date: "2024-11-10", status: "Running" },
    { id: 4,img:'/assets/airpods.png',price:'130,000',yourBid:'150,000', sellerName:'Ahsan', location:'Lahore, Punjab',sellerContact:'+92323 .....',sellerEmail:'seller@example.com', title: "Airpods", company: "Ronins", date: "2024-11-12", status: "Winner" },
    { id: 5,img:'/assets/chair.png',price:'130,000',yourBid:'150,000', sellerName:'Ahsan', location:'Lahore, Punjab',sellerContact:'+92323 .....',sellerEmail:'seller@example.com', title: "Chair", company: "No Company", date: "2024-11-15", status: "Running" },
  ];
  const [selectedApplication, setSelectedApplication] = useState(null); // State to hold clicked application details
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationModal,setConfirmationModal]=useState(false)
const router = useRouter()
  const handleRowClick = (app) => {
    setSelectedApplication(app); // Set the clicked application data
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedApplication(null); // Clear selected application
};
const handleOpenConfirmationModal = ()=>{
      setIsModalOpen(false); // Close the modal

    setConfirmationModal(true)
  }

  const handleCloseConfirmationModal = ()=>{
    setConfirmationModal(false)
  }
  const handleGiveTest = ()=>{
    router.push('/skill-test')
    setConfirmationModal(false)
  }
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
            <th className="border border-darkgray px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
              <tr onClick={() => handleRowClick(app)} key={app.id} className="hover:bg-gray-100">
                <td className="border border-darkgray px-4 py-2">
                
                <img src={app.img} alt={app.title} className="h-10 w-10" />
                </td>
              <td className="border border-darkgray text-nowrap overflow-hidden text-ellipsis px-4 py-2">{app.title}</td>
              <td className="border border-darkgray text-nowrap overflow-hidden text-ellipsis px-4 py-2">{app.company}</td>
              <td className="border border-darkgray text-nowrap overflow-hidden text-ellipsis px-4 py-2">{app.sellerName}</td>
              <td className="border border-darkgray text-nowrap overflow-hidden text-ellipsis px-4 py-2">{app.sellerContact}</td>
              <td className="border border-darkgray text-nowrap overflow-hidden text-ellipsis px-4 py-2">{app.sellerEmail}</td>
              <td className="border border-darkgray text-nowrap overflow-hidden text-ellipsis px-4 py-2">{app.price}</td>
              <td className="border border-darkgray text-nowrap overflow-hidden text-ellipsis px-4 py-2">{app.yourBid}</td>
              <td
                className={`border border-darkgray px-4 py-2 ${
                  app.status === "Winner"
                  ? "text-green font-bold"
                  : app.status === "Closed"
                    ? "text-red font-bold"
                    : "text-yellow font-bold"
                }`}
              >
                {app.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {isModalOpen && 
    <ProposalDetailModal
    selectedApplication={selectedApplication}
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
