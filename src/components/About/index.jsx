import React from 'react'
import { FaBoxOpen,FaLock ,FaRegClock ,FaHeadset  } from 'react-icons/fa';
const About = () => {

    const data=[
        {
            id:1,
            title:'Wide Range of Products',
            desc:'Access a diverse selection of products from various categories, all in one place.',
            icon:<FaBoxOpen className=" text-purplelight" size={90} />
        },
        {
            id:2,
            title:'Secure Transactions',
            desc:'Our platform ensures secure and reliable transactions for a hassle-free bidding experience.',
            icon: <FaLock className=" text-purplelight" size={90}/>
        },
        {
            id:3,
            title:'Real-Time Auctions',
            desc:'Participate in live, real-time auctions to get the best deals as they happen.',
            icon:<FaRegClock className=" text-purplelight" size={90}/>
        },
        {
            id:4,
            title:'Expert Customer Support',
            desc:'Our dedicated support team is available 24/7 to assist with any questions or concerns.',
            icon:<FaHeadset className=" text-purplelight" size={90}/>
        },
    ]
    return (
        <div id='about' className='bg-aboutbg bg-cover  px-6 md:px-10 py-32  w-full  overflow-hidden relative'>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className=' max-w-[1440px] mx-auto w-full gap-5 relative z-[0.1]'>
                <h1 className='text-[35px] md:text-[40px] text-center lg:text-[48px] xl:text-[60px] text-white font-medium mb-8 leading-tight'>Why choose Us</h1>
                <p className='text-white text-center mt-5 mb-10 w-full max-w-lg mx-auto'>Experience seamless, secure, and dynamic live auctions with a wide range of products, real-time bidding, and unmatched customer support—all designed to give you the best auction experience.</p>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mt-10'>
                    {data?.map((data,i)=>(
                        <div className='p-4 flex flex-col items-center gap-4' key={i}>
                            {data.icon}
                            <h1 className='text-24 text-white font-bold text-center'>{data.title}</h1>
                            <h3 className='text-lightgray text-center'>{data.desc}</h3>
                        </div>
                    ))}

                </div>
            
            </div>
        </div>
    )
}

export default About
