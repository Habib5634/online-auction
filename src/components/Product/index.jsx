'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import BidModal from './BidModal'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { API_URL } from '@/utils/apiUrl'
import useSingleCountdown from '@/hooks/useSingleCoundown'
import { useSelector } from 'react-redux'

const Product = () => {


    const [currentIndex, setCurrentIndex] = useState(0);
    const [openProductmodal, setOpenProductModal] = useState(false)
    const { productId } = useParams()
    const [product, setProduct] = useState({})
    const timeLeft = useSingleCountdown(product?.endDate);
    const { userData,isAuthenticated } = useSelector((state) => state.userData)
    const router = useRouter()
    const handleOpenModal = () => {
if(isAuthenticated){
    setOpenProductModal(true)
}else{
    router.push('/login')
}


    }
    const fetchProductById = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/user/get-single-product/${productId}`)
            setProduct(data?.product)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProductById()
    }, [])

    const handleCloseModal = () => {
        setOpenProductModal(false)
    }

    // Handler to go to the next image
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % product?.images?.length);
    };

    // Handler to go to the previous image
    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? product?.images?.length - 1 : prevIndex - 1
        );
    };

    // Handler to set the main image when clicking on thumbnails
    const setMainImage = (index) => {
        setCurrentIndex(index);
    };
  
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
                                        src={product?.images && product.images.length > 0 ? product.images[currentIndex] : '/placeholder.jpg'}
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
                                {product?.images?.map((img, index) => (
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

                            {!timeLeft ? "Auction Ended" :
                                <div className='text-24 mt-4 text-white text-center'>
                                    <span>Ends In </span>
                                    {timeLeft.days > 0 && <span>{timeLeft.days} days </span>}
                                    {timeLeft.hours > 0 && <span>{timeLeft.hours}h : </span>}
                                    <span>{timeLeft.minutes}m: </span>
                                    <span>{timeLeft.seconds}s </span>
                                </div>
                            }
                            <div className='flex justify-between items-center mt-6'>
                                <h1 className='text-purplelight font-bold text-20'>Product Title</h1>
                                <h1 className='text-white font-semibold text-18'>{product?.productName}</h1>
                            </div>
                            <div className='flex justify-between items-center mt-6'>
                                <h1 className='text-purplelight font-bold text-20'>Auction Price</h1>
                                <h1 className='text-white font-semibold text-18'><span className='text-14'>Starting From</span> {product?.price}</h1>
                            </div>
                            <div className='flex justify-between items-center mt-6'>
                                <h1 className='text-purplelight font-bold text-20'>Seller Name</h1>
                                <h1 className='text-white font-semibold text-18'>{product?.sellerId?.fullName}</h1>
                            </div>
                            <div className='flex justify-between items-center mt-6'>
                                <h1 className='text-purplelight font-bold text-20'>Location</h1>
                                <h1 className='text-white font-semibold text-18'>{product?.location}</h1>
                            </div>
                            <div className='flex flex-col mt-6'>
                                <h1 className='text-purplelight font-bold text-20'>Product Description</h1>
                                <p className='mt-4 text-white'>{product?.description1}</p>
                                <p className='text-white mt-4'>{product?.description2}</p>
                                <p className='text-white mt-4'>{product?.description3}</p>
                            </div>
                            <button onClick={handleOpenModal} className='py-4 text-center text-18 font-semibold text-white bg-purplelight w-full mt-6'>Place Your Bid</button>


                        </div>

                    </div>




                </div>
            </div>
            <Footer />
            {
                openProductmodal && <BidModal
                    handleCloseModal={handleCloseModal}
                    product={product}
                />
            }


        </>
    )
}

export default Product
