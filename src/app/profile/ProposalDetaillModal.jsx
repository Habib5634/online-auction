'use client'
import React from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";
const ProposalDetailModal = ({selectedApplication,closeModal,handleOpenConfirmationModal}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 relative ">
      <h3 className="text-xl font-bold mb-4">Application Details</h3>
      <div className='flex flex-col gap-3'>

      <p><strong>Job Title:</strong> {selectedApplication?.jobTitle}</p>
      <p><strong>Company:</strong> {selectedApplication?.company}</p>
      <p><strong>Date:</strong> {selectedApplication?.date}</p>
      <p><strong>Status:</strong> {selectedApplication?.status}</p>
      </div>
      {selectedApplication?.status ==='Accepted' &&
      <div className='flex flex-col gap-3'>
        <h1>Give Skills Assesment test to get the interview call</h1>
        <button onClick={handleOpenConfirmationModal} className='py-2 px-4 bg-green text-white rounded-md font-bold'>Give Test</button>
      </div>
      }
   
      <IoMdCloseCircleOutline onClick={closeModal} size={25} className='absolute top-6 right-6 text-black' />
    </div>
  </div>
  )
}

export default ProposalDetailModal