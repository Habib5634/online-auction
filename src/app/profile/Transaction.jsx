'use client'
import { API_URL, getAuthHeaders } from '@/utils/apiUrl'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Transaction = ({user}) => {
  const [transactions,setTransactions] = useState([])
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");

  const openModal = (transaction, newStatus) => {
    setSelectedTransaction(transaction);
    setStatus(newStatus);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (selectedTransaction) {
      onUpdateStatus(selectedTransaction._id, status);
    }
    setIsModalOpen(false);
  };
  const handleFetchTransactions= async()=>{
    try {
      const response = await axios.get(`${API_URL}/seller/transactions`,getAuthHeaders())
      console.log(response)
      setTransactions(response?.data?.transactions)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    handleFetchTransactions()
  },[])
  const onUpdateStatus = async (transactionId, status) => {
    try {
      const response = await axios.put(`${API_URL}/seller/transaction/${transactionId}`, {status} ,getAuthHeaders());

     if(response?.success){
       handleFetchTransactions()
      }

    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  return (
    <div className="p-6">
    <div className='flex justify-between items-center'>

        <h2 className="text-2xl font-bold mb-4">Product List</h2>
       

    </div>
    <div className="overflow-x-auto">
    <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Buyer</th>
            <th className="border p-2">Seller</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            <tr key={transaction._id} className="text-center">
              <td className="border p-2">{transaction.buyerId.fullName}</td>
              <td className="border p-2">{transaction.sellerId.fullName}</td>
              <td className="border p-2">{transaction.productId.productName}</td>
              <td className="border p-2">${transaction.amount}</td>
              <td className="border p-2">{transaction.status}</td>
              <td className="border p-2 space-x-2">
              {transaction.status === "pending" ? (
                  <>
                    <button
                      className="bg-green text-white px-3 py-1 rounded"
                      onClick={() => openModal(transaction, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red text-white px-3 py-1 rounded"
                      onClick={() => openModal(transaction, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="text-gray">None</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Confirmation Modal */}
    {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Action</h3>
            <p>Are you sure you want to {status} this transaction?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-gray text-red px-3 py-1 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  status === "accepted" ? "bg-green" : "bg-red"
                } text-white`}
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

</div>
  )
}

export default Transaction
