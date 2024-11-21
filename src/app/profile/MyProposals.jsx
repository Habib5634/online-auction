'use client'
import React, { useState } from "react";
// import SuubmittedApplicationModal from "./SuubmittedApplicationModal";
import { useRouter } from "next/navigation";
import ProposalDetailModal from "./ProposalDetaillModal";

const MyProposals    = () => {
  // Dummy data
  const applications = [
    { id: 1, jobTitle: "Frontend Developer", company: "TechCorp", date: "2024-11-01", status: "Accepted" },
    { id: 2, jobTitle: "Backend Developer", company: "Innovatech", date: "2024-11-05", status: "Rejected" },
    { id: 3, jobTitle: "UI/UX Designer", company: "Designify", date: "2024-11-10", status: "Pending" },
    { id: 4, jobTitle: "QA Engineer", company: "QualityPro", date: "2024-11-12", status: "Accepted" },
    { id: 5, jobTitle: "Project Manager", company: "ManageWell", date: "2024-11-15", status: "Pending" },
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
            <th className="border border-darkgray px-4 py-2 text-left">Job Title</th>
            <th className="border border-darkgray px-4 py-2 text-left">Company</th>
            <th className="border border-darkgray px-4 py-2 text-left">Date</th>
            <th className="border border-darkgray px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
              <tr onClick={() => handleRowClick(app)} key={app.id} className="hover:bg-gray-100">
              <td className="border border-darkgray px-4 py-2">{app.jobTitle}</td>
              <td className="border border-darkgray px-4 py-2">{app.company}</td>
              <td className="border border-darkgray px-4 py-2">{app.date}</td>
              <td
                className={`border border-darkgray px-4 py-2 ${
                  app.status === "Accepted"
                  ? "text-green font-bold"
                  : app.status === "Rejected"
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
