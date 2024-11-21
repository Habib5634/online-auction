import React from 'react'
import { FaFacebookF, FaTwitter, FaLinkedin, FaYoutube, FaPhone } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

import { IoLocationSharp } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";



const Footer = () => {
    return (
        <>
            <div className=' bg-purplelight w-full'>
                <div className='w-full max-w-[1440px] px-6 md:px-10 grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-3 py-4 mx-auto gap-6 xl:gap-2'>
                    <h1 className='text-2xl xl:text-3xl uppercase font-semibold text-white'>Subscribe to the auction </h1>
                    <div className='flex items-center'>
                        <input type="email" name="email" className='py-[8.5px] px-4 ' placeholder='Email Address' />
                        <button className='uppercase text-white bg-purpledark  py-2 px-4'>Subscribe</button>

                    </div>
                    <div className='flex gap-2 items-center justify-start md:justify-center'>
                        <div className='h-14 w-14 border border-gray hover:bg-purple anim3 cursor-pointer flex justify-center items-center'>
                            <FaFacebookF className='text-white' size={22} />

                        </div>
                        <div className='h-14 w-14 border border-gray hover:bg-purple anim3 cursor-pointer flex justify-center items-center'>
                            <FaTwitter className='text-white' size={22} />

                        </div>
                        <div className='h-14 w-14 border border-gray hover:bg-purple anim3 cursor-pointer flex justify-center items-center'>
                            <FaLinkedin className='text-white' size={22} />

                        </div>
                        <div className='h-14 w-14 border border-gray hover:bg-purple anim3 cursor-pointer flex justify-center items-center'>
                            <FaYoutube className='text-white' size={22} />

                        </div>
                    </div>


                </div>

            </div>
            <div id='contact' className='bg-purpledark  px-6 md:px-10 py-16  w-full relative overflow-hidden'>
                <div className=' max-w-[1440px] mx-auto w-full gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>

                    {/* contact details */}
                    <div className='flex flex-col gap-12'>
                        <h1 className='text-3xl font-bold text-purplelight '>Online<span className='text-white'>-Auction</span></h1>
                        <div className='flex flex-col gap-4 items-start'>
                            <div className='flex items-center gap-4'>
                                <div className='h-10 w-10 border border-gray hover:bg-purple anim3 cursor-pointer flex justify-center items-center'>
                                    <IoLocationSharp className='text-white' size={16} />
                                </div>
                                <p className='text-lightgray'>Abbottabad, KPK, Pakistan </p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className='h-10 w-10 border border-gray hover:bg-purple anim3 cursor-pointer flex justify-center items-center'>
                                    <FaPhone className='text-white' size={16} />
                                </div>
                                <p className='text-lightgray'>+92-313-5634-882 </p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className='h-10 w-10 border border-gray hover:bg-purple anim3 cursor-pointer flex justify-center items-center'>
                                    <MdMailOutline className='text-white' size={16} />
                                </div>
                                <p className='text-lightgray'>habib.dev3@gmail.com</p>
                            </div>

                        </div>
                    </div>
                    {/* featured links */}
                    <div className='flex flex-col gap-14'>
                        <h1 className='text-2xl font-bold text-white uppercase'>Featured Links</h1>
                        <div className='flex flex-col gap-4 items-start'>
                            <div className='flex items-center gap-4 text-lightgray'>
                                <IoMdArrowDropright />
                                <p className='text-lightgray header-link '>About us </p>
                            </div>
                            <div className='flex items-center gap-4 text-lightgray'>
                                <IoMdArrowDropright />
                                <p className='text-lightgray header-link'>Live Auctions </p>
                            </div>
                            <div className='flex items-center gap-4 text-lightgray'>
                                <IoMdArrowDropright />
                                <p className='text-lightgray header-link'>Categories</p>
                            </div>
                            <div className='flex items-center gap-4 text-lightgray'>
                                <IoMdArrowDropright />
                                <p className='text-lightgray header-link'>Faqs</p>
                            </div>

                        </div>
                    </div>
                    {/* recent auctions */}
                    <div className='flex flex-col gap-14'>
                        <h1 className='text-2xl font-bold text-white uppercase'>Recent auctions</h1>
                        <div className='flex flex-col gap-4 items-start'>
                            <div className='flex items-center gap-4 text-lightgray'>
                                <img src="/assets/car.png" alt="car" className='h-20 w-20' />
                                <div className='flex flex-col justify-between h-full py-2'>
                                    <h1 className='text-white font-semibold'>Suzuki Aulto</h1>
                                     <div className='flex items-center gap-6'>
                                        <h1 className='text-white'>Rs:<span className='text-purplelight font-bold'>134,0000</span></h1>
                                         | <p className='text-lightgray'>Punjab</p>
                                         </div>   
                                </div>
                            </div>
                            <div className='flex items-center gap-4 text-lightgray'>
                                <img src="/assets/car.png" alt="car" className='h-20 w-20' />
                                <div className='flex flex-col justify-between h-full py-2'>
                                    <h1 className='text-white font-semibold'>Suzuki Aulto</h1>
                                     <div className='flex items-center gap-6'>
                                        <h1 className='text-white'>Rs:<span className='text-purplelight font-bold'>134,0000</span></h1>
                                         | <p className='text-lightgray'>Punjab</p>
                                         </div>   
                                </div>
                            </div>
                           

                        </div>
                    </div>

                    {/* Our galery */}
                    <div className='flex flex-col gap-14'>
                        <h1 className='text-2xl font-bold text-white uppercase'>Our galery</h1>
                        <div className='grid grid-cols-4 gap-2 '>
                            <img src="/assets/car.png" alt="products" className='w-full object-cover h-16' />
                            <img src="/assets/tv.png" alt="products" className='w-full object-cover h-16' />
                            <img src="/assets/bike.png" alt="products" className='w-full object-cover h-16' />
                            <img src="/assets/camera.png" alt="products" className='w-full object-cover h-16' />
                            <img src="/assets/chair.png" alt="products" className='w-full object-cover h-16' />
                            <img src="/assets/laptop.png" alt="products" className='w-full object-cover h-16' />
                            <img src="/assets/watch.png" alt="products" className='w-full object-cover h-16' />
                            <img src="/assets/airpods.png" alt="products" className='w-full object-cover h-16' />
                           

                        </div>
                    </div>


                </div>
            </div>

            <div className='w-full text-center bg-purple4 text-white py-4'>
                © Copyright 2024 Online Auction | All Rights Reserved.

            </div>
        </>
    )
}

export default Footer
