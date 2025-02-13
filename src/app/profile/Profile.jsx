'use client'
import Navbar from '@/components/Navbar'
import React, { useEffect, useState } from 'react'
import ProfileInfo from './ProfileInfo'
import UpdateInfo from './UpdateInfo'
import MyProposals from './MyProposals'
import MyProducts from './MyProducts'
import AddNewProduct from './AddNewProduct'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuth } from '@/Store/ReduxSlice/userSlice'
import RecievedBids from './ProductBids'
import Transaction from './Transaction'
import axios from 'axios'
import { API_URL, getAuthHeaders } from '@/utils/apiUrl'
// import SubmittedApplications from './SubmittedApplications'

const Profile = () => {
    const [activeTab, setActiveTab] = useState('profile')
    const router = useRouter()
    const { userData, laodingData, errorUser, isAuthenticated } = useSelector((state) => state.userData)
    const [selectedImage, setSelectedImage] = useState(userData?.profile || "");
    const dispatch = useDispatch()


    const handleActiveTab = (tab) => {
        setActiveTab(tab)
    }
    const handleLogout = async () => {
        try {
            localStorage.removeItem('token')
            dispatch(clearAuth());
            toast.success("Logout Successfully")
            router.push('/login')

        } catch (error) {
            console.log(error)
        }
    }
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Convert the file to Base64
            const base64 = await convertToBase64(file);

            // Update the displayed image
            setSelectedImage(base64);

            // Upload the file
            await handleUpdate(base64);
        }
    };

    // Function to convert file to Base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // Function to handle API update
    const handleUpdate = async (base64) => {
        try {
            const response = await axios.put(`${API_URL}/auth/update/`, {
                profile: base64, // Send Base64 image to API
            },getAuthHeaders());

            if (response.status === 200) {
                console.log("Profile updated successfully:", response.data);
                alert("Profile updated successfully!");
            } else {
                console.error("Failed to update profile:", response);
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error during profile update:", error);
            alert("An error occurred while updating the profile.");
        }
    };
    console.log(userData)
    return (
        <div className='bg-purpledark  h-screen overflow-hidden'>
            <Navbar />
            <div className='  px-6 md:px-10 lg:px-16 h-full  min-h-[90vh]  w-full overflow-hidden'>
                <div className='w-full max-w-[1440px] flex flex-col md:flex-row overflow-auto lg:overflow-hidden mx-auto shadow-shad mt-6 bg-bluegray h-[80vh]   rounded-2xl '>
                    <div className='w-full md:w-1/3 h-fit md:h-full overflow-y-auto bg-purpledark rounded-2xl p-4'>
                        <div className='flex flex-col gap-3 items-center'>
                            <label htmlFor="file-upload" className="cursor-pointer">
                                <img
                                    src={selectedImage || userData?.profile} // Fallback to a placeholder image if no profile exists
                                    alt="user-profile"
                                    className="h-[200px] w-[200px] md:h-[250px] md:w-[250px] rounded-full bg-lightgray mx-auto"
                                />
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                className="hidden" // Hide the input and trigger with label
                                onChange={handleFileChange}
                            />
                            <h1 className='text-center border-b w-fit text-nowrap text-ellipsis text-20 md:text-24 uppercase font-semibold text-purple'>{userData?.fullName}</h1>
                        </div>
                        <div className='flex flex-row md:flex-col overflow-x-auto scrollbar-hide w-full mx-auto justify-start  mt-6 items-center md:items-start px-6 gap-6'>
                            <button onClick={() => handleActiveTab('profile')} className={` text-nowrap ${activeTab === 'profile' ? 'text-purple font-bold border-b text-20' : 'text-lightgray text-18'}`}>Profile</button>
                            <button onClick={() => handleActiveTab('update')} className={` text-nowrap ${activeTab === 'update' ? 'text-purple font-bold border-b text-20' : 'text-lightgray text-18'}`}>Update Information</button>
                            <button onClick={() => handleActiveTab('submit')} className={` text-nowrap ${activeTab === 'submit' ? 'text-purple font-bold border-b text-20' : 'text-lightgray text-18'}`}>My Bids</button>
                            {userData?.userType === 'seller' && (
                                <>
                                    <button onClick={() => handleActiveTab('products')} className={` text-nowrap ${activeTab === 'products' ? 'text-purple font-bold border-b text-20' : 'text-lightgray text-18'}`}>My Products</button>
                                    <button onClick={() => handleActiveTab('new-product')} className={` text-nowrap ${activeTab === 'new-product' ? 'text-purple font-bold border-b text-20' : 'text-lightgray text-18'}`}>Add New Product</button>
                                    <button onClick={() => handleActiveTab('product-bids')} className={` text-nowrap ${activeTab === 'product-bids' ? 'text-purple font-bold border-b text-20' : 'text-lightgray text-18'}`}>Product Bids</button>
                                    <button onClick={() => handleActiveTab('transactions')} className={` text-nowrap ${activeTab === 'transactions' ? 'text-purple font-bold border-b text-20' : 'text-lightgray text-18'}`}>Transactions</button>
                                </>
                            )}
                            <button onClick={handleLogout} className={` text-nowrap text-lightgray text-18`}>Logout</button>

                        </div>

                    </div>
                    <div className='w-full md:w-2/3 h-full p-4 overflow-auto'>
                        {activeTab === 'profile' && <ProfileInfo user={userData} />}
                        {activeTab === 'update' && <UpdateInfo user={userData} />}
                        {activeTab === 'submit' && <MyProposals user={userData} />}
                        {activeTab === 'products' && <MyProducts user={userData} />}
                        {activeTab === 'new-product' && <AddNewProduct user={userData} />}
                        {activeTab === 'product-bids' && <RecievedBids user={userData} />}
                        {activeTab === 'transactions' && <Transaction user={userData} />}

                    </div>


                </div>
            </div>
        </div>
    )
}

export default Profile