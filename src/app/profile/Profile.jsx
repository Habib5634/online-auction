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
// import SubmittedApplications from './SubmittedApplications'

const Profile = () => {
    const [activeTab, setActiveTab] = useState('profile')

    const router = useRouter()
    const { userData, laodingData, errorUser, isAuthenticated } = useSelector((state) => state.userData)
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
    return (
        <div className='bg-purpledark  h-screen overflow-hidden'>
            <Navbar />
            <div className='  px-6 md:px-10 lg:px-16 h-full  min-h-[90vh]  w-full overflow-hidden'>
                <div className='w-full max-w-[1440px] flex flex-col md:flex-row overflow-auto lg:overflow-hidden mx-auto shadow-shad mt-6 bg-bluegray h-[80vh]   rounded-2xl '>
                    <div className='w-full md:w-1/3 h-fit md:h-full overflow-y-auto bg-purpledark rounded-2xl p-4'>
                        <div className='flex flex-col gap-3 items-center'>
                            <img src="/assets/image.png" alt="user-profile" className='h-[200px] w-[200px] md:h-[250px] md:w-[250px] rounded-full bg-lightgray mx-auto' />

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

                    </div>


                </div>
            </div>
        </div>
    )
}

export default Profile