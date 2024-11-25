'use client'
import useScrollTrigger from '@/hooks/useScrollTrigger';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { FaBars, FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { IoCloseCircleSharp, IoLogoWhatsapp } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import ProfileMenu from './ProfileMenu';
const Navbar = () => {
    const { scrollTrigger, scrollDirection } = useSelector((state) => state.scroll);
    const [showSidebar, setShowSidebar] = useState(false)
const router =useRouter()
    const handelShowSidebar = () => {
        setShowSidebar(!showSidebar)
    }
    const [user, setUser] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem('user');
        if (data) {
            setUser(JSON.parse(data)); // Parse the JSON string into an object
        }
    }, []);
    
   
    useScrollTrigger()
    // Scroll to a specific section
    // Store scroll position in state
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            // Scroll to the section if it exists
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Redirect the user to the "Home" page
            router.push('/');

        }
        // Close the sidebar after scrolling
        setShowSidebar(false);
    };
    return (
        <>
        <div className={`flex z-20 sticky  top-0 justify-center w-full anim5  ${scrollTrigger < 10 ? ' bg-transparent' : " bg-purpledark"} `}>
            <div className='flex justify-center w-full max-w-[1440px] mx-auto '>
                <div className={`flex justify-between items-center px-5 md:px-8 lg:px-14 py-4  top-0 w-full `}>
                    <Link href={'/'}>
                        <div className='flex items-center'>
                            <span className='text-3xl md:text-4xl leading-none font-bold text-purplelight'>Online</span>
                            <span className=' text-3xl md:text-4xl  font-bold leading-none  tracking-wide text-white capitalize   '>-Auction</span>
                        </div>
                    </Link>
                    <div className={`hidden lg:flex items-center ${scrollTrigger > 1 ? 'gap-9' : 'xl:gap-10 lg:gap-8'} relative anim5`}>
                            <Link href={'/'}>
                            <button onClick={() => scrollToSection('home')} className='xl:text-18 lg:text-16 font-bold text-white header-link'>Home</button>
                            </Link>
                            <button onClick={() => scrollToSection('auctions')} className='xl:text-18 lg:text-16 font-bold text-white header-link'>Auction</button>
                            <button onClick={() => scrollToSection('about')} className='xl:text-18 lg:text-16 font-bold text-white header-link'>About</button>
                            <button onClick={() => scrollToSection('contact')} className='xl:text-18 lg:text-16 font-bold text-white header-link'>Contact</button>
                            <button onClick={() => scrollToSection('category')} className='xl:text-18 lg:text-16 font-bold text-white header-link'>Product</button>
                            {user !== null ? (
                            <>
                            <ProfileMenu/>
                            </>):(
                            <Link href={'/login'}>

                                <button className={`${scrollTrigger > 1 ? 'px-3 md:px-5 py-2' : 'px-3 md:px-8 py-4 lg:py-3 lg:px-7'} anim5 rounded-lg text-center text-[15px] hover:bg-purplelight anim3 text-white font-bold uppercase bg-transparent border border-purplelight`}>Login/Register</button></Link>
                            )}
                                </div>
                        <div className='flex lg:hidden items-center gap-2 '>


<Link href={'/login'}>
                            <button className={`${scrollTrigger > 1 ? 'px-3 md:px-5 py-2' : 'py-2 px-3 xl:px-8 xl:py-4 lg:py-3 lg:px-7'} anim5 rounded-lg text-center text-12 md:text-[15px] hover:bg-purple anim3 text-white uppercase bg-transparent border border-purple`}>Login/Register</button>
                            </Link>
                            <FaBars className='text-purple' onClick={handelShowSidebar} />
                        </div>
                </div>
            </div>
        </div>
        
        {showSidebar &&
                <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-10">


                </div>
            }
            <div className={`fixed top-0 right-0 flex flex-col anim5 z-20 min-h-screen    p-16 ease-in-out  ${showSidebar ? "-translate-x-0 " : "translate-x-full"} w-full max-w-sm bg-purpledark  `}>
                <span><IoCloseCircleSharp className='text-24 text-purple absolute right-10 top-6' onClick={handelShowSidebar} /></span>
                <div className='flex flex-col items-start mt-10 gap-10 '>
                    <button onClick={() => scrollToSection('home')} className='text-16 text-white header-link w-full text-start '>Home</button>
                    <button onClick={() => scrollToSection('auctions')} className='text-16 text-white header-link w-full text-start'>Auctions</button>
                    <button onClick={() => scrollToSection('about')} className='text-16 text-white header-link w-full text-start'>About</button>
                    <button onClick={() => scrollToSection('category')} className='text-16 text-white header-link w-full text-start'>Products</button>
                    <button onClick={() => scrollToSection('contact')} className='text-16 text-white header-link w-full text-start'>Contact</button>
                </div>

                <div className='mt-10'>
                    <h1 className='text-20 font-bold text-white'>Get In Touch</h1>

                    <div className='mt-6 flex items-center gap-4 text-24 text-purple'>
                        <IoLogoWhatsapp />
                        <FaLinkedin />
                        <FaFacebookSquare />

                    </div>

                </div>
            </div>
        </>
    )
}

export default Navbar
