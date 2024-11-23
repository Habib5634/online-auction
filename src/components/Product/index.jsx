'use Client'
import React, { useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import BidModal from './BidModal'

const Product = () => {
    const images = [
        '/assets/camera.png',
        '/assets/laptop.png',
        '/assets/airpods.png',
        '/assets/chair.png',
        '/assets/bike.png',
        '/assets/car.png',
    ]

    const [currentIndex, setCurrentIndex] = useState(0);
    const [openProductmodal,setOpenProductModal] = useState(false)
    
    const handleOpenModal = ()=>{
        setOpenProductModal(true)
        
    }

    const handleCloseModal = ()=>{
        setOpenProductModal(false)
    }

    // Handler to go to the next image
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Handler to go to the previous image
    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    // Handler to set the main image when clicking on thumbnails
    const setMainImage = (index) => {
        setCurrentIndex(index);
    };
    const handleConfirm = ()=>{
        alert('You bid is placed. Please check bid detail in your profile')
        setOpenProductModal(false)
    }
    return (
        <>
            <Navbar />
            <div className='bg-purpledark -mt-[81px]  px-6 md:px-10 py-32 xl:py-40 w-full relative overflow-hidden'>
                <div className=' max-w-[1440px] mx-auto w-full gap-5 relative z-[0.1]'>
                    <div className='grid grid-cols-5 gap-6'>
                        <div className='col-span-5 lg:col-span-3'>
                            <div className="relative flex justify-center items-center">
                                <button
                                    onClick={prevImage}
                                    className="absolute flex justify-center items-center left-0 w-10 h-10 text-24 leading-none bg-white text-purplelight rounded-full "
                                >
                                    <FaAngleLeft />
                                </button>
                                <div className='p-4 md:p-6 lg:p-10'>

                                <img
                                    src={images[currentIndex]}
                                    alt={`Slide ${currentIndex + 1}`}
                                    className="w-full h-[450px] object-cover"
                                    />
                                    </div>
                                <button
                                    onClick={nextImage}
                                    className="absolute flex justify-center items-center right-0 w-10 h-10 text-24 leading-none bg-white text-purplelight rounded-full hover:bg-gray-600"
                                >
                                    <FaAngleRight />
                                </button>
                            </div>

                            {/* Thumbnails */}
                            <div className="flex justify-center items-center gap-2 mt-4">
                                {images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        className={` object-cover border-2 rounded-lg cursor-pointer anim3 ${index === currentIndex ? 'border-purplelight w-20 h-20' : 'border-gray w-16 h-16'
                                            }`}
                                        onClick={() => setMainImage(index)}
                                    />
                                ))}
                            </div>

                        </div>
                        <div className=' col-span-5 lg:col-span-2'>
                            <div className='py-4 text-3xl uppercase font-semibold text-white text-center w-full bg-purplelight'>
                                Product Detail

                            </div>
                            <div className='flex justify-between items-center mt-6'>
                            <h1 className='text-purplelight font-bold text-20'>Product Title</h1>
                            <h1 className='text-white font-semibold text-18'>Canon Camera</h1>
                            </div>
                            <div className='flex justify-between items-center mt-6'>
                            <h1 className='text-purplelight font-bold text-20'>Auction Price</h1>
                            <h1 className='text-white font-semibold text-18'><span className='text-14'>Starting From</span> 130,0000</h1>
                            </div>
                            <div className='flex justify-between items-center mt-6'>
                            <h1 className='text-purplelight font-bold text-20'>Seller Name</h1>
                            <h1 className='text-white font-semibold text-18'>Ahsan</h1>
                            </div>
                            <div className='flex justify-between items-center mt-6'>
                            <h1 className='text-purplelight font-bold text-20'>Location</h1>
                            <h1 className='text-white font-semibold text-18'>Lahore,Punjab</h1>
                            </div>
                            <div className='flex flex-col mt-6'>
                            <h1 className='text-purplelight font-bold text-20'>Product Description</h1>
                            <p className='mt-4 text-white'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, doloremque vel provident saepe corrupti nisi.</p>
                            <p className='text-white mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur totam repellat adipisci esse!</p>
                            </div>
                            <button onClick={handleOpenModal} className='py-4 text-center text-18 font-semibold text-white bg-purplelight w-full mt-6'>Place Your Bid</button>


                        </div>

                    </div>




                </div>
            </div>
            <Footer />
            {
               openProductmodal &&<BidModal
               handleCloseModal={handleCloseModal}
               handleConfirm={handleConfirm}
               /> 
            }


        </>
    )
}

export default Product
