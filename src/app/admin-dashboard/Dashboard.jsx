'use client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import DashProducts from './DashProducts';
import Users from './Users';
import { clearAuth } from '@/Store/ReduxSlice/userSlice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Categories from './Categories';
const tabs = ["categories","products", "users",];
const Dashboard = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useDispatch()
    const tab = searchParams.get("tab") || "products";
    const [activeTab, setActiveTab] = useState(tab);

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
    useEffect(() => {
        setActiveTab(tab);
    }, [tab]);

    const handleActiveTab = (newTab) => {
        setActiveTab(newTab);
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set("tab", newTab);

        router.replace(`?${current.toString()}`, { scroll: false });
    };
    console.log(activeTab)
    return (
        <div id='auctions' className='bg-purpledark text-white min-h-screen  px-6 md:px-10  w-full relative overflow-hidden'>
            <div className=' max-w-[1440px] mx-auto w-full gap-5 relative z-[0.1]'>
                <Link href={'/admin-dashboard'}>
                    <div className='flex items-center h-20'>
                        <span className='text-3xl md:text-4xl leading-none font-bold text-purplelight'>Online</span>
                        <span className=' text-3xl md:text-4xl  font-bold leading-none  tracking-wide text-white capitalize   '>-Auction Dashboard</span>
                    </div>
                </Link>

                <div className='flex items-center justify-center gap-4 lg:gap-20'>
                    {tabs.map((tabName) => (
                        <button
                            key={tabName}
                            onClick={() => handleActiveTab(tabName)}
                            className={`text-2xl  ${activeTab === tabName ? "font-bold underline underline-offset-1" : "font-medium"
                                }`}
                        >
                            {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                        </button>
                    ))}

                    <button
                        onClick={handleLogout}
                        className={`text-2xl font-medium `}
                    >
                        Logout
                    </button>
                </div>

                {activeTab === 'products' && <DashProducts />}
                {activeTab === 'users' && <Users />}
                {activeTab === 'categories' && <Categories />}

            </div>


        </div>
    )
}

export default Dashboard
