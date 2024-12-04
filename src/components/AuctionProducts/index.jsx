'use client'
import React, { useEffect, useState } from 'react'
import { BiCategoryAlt } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import Slider from 'react-slick';
import { useCategories } from '../Category/useCategories';
import ProductBidModal from '../Category/ProductBidModal';
import axios from 'axios';
import { API_URL } from '@/utils/apiUrl';
import useCountdowns from '@/hooks/useCoundown';

const AuctionProducts = () => {

  const [products, setProducts] = useState([])
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // 2 seconds
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };
  const { openProductmodal,
    selectedProduct,
    handelCloseProductModal,
    handleSelectProduct, handleConfirmBid,setBidPrice } = useCategories()





  const fetchLatestProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/user/get-latest-products`)
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchLatestProducts()
  }, [])

  const endDates = products?.map((product) => product?.endDate);
  const countdowns = useCountdowns(endDates);
  return (
    <>
      <div id='auctions' className='bg-purpledark  px-6 md:px-10 py-32 xl:py-40 w-full relative overflow-hidden'>
        <div className=' max-w-[1440px] mx-auto w-full gap-5 relative z-[0.1]'>
          <h1 className='text-[35px] md:text-[40px] text-center lg:text-[48px] xl:text-[60px] text-white font-medium mb-8 leading-tight'>Live Auctions</h1>
          <p className='text-white text-center mt-5 mb-10'>Discover exclusive deals and bid live on unique products in real-time</p>
          {/* <div className='grid grid-cols-2 mt-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'> */}
          <Slider {...sliderSettings} className='space-x-2 '>

            {products?.filter(pro => pro.isOpen).map((product, i) => {
              const timeLeft = countdowns[i];
              return (

                <div key={i} className="p-4 h-full max-h-[460px] ">
                  <div className="p-4 shadow-shad min-h-full rounded-2xl relative">
                    <div className='absolute -top-0 -left-0 bg-purple4 w-full max-w-[180px] rounded-tl-2xl gap-2 flex  items-center justify-center py-2'>
                      <h1 className='text-white text-12'>Ends in</h1>
                      <h3 className="text-white text-16 font-bold">
                        {timeLeft ? (
                          <span>
                            {timeLeft.days > 0 && `${timeLeft.days}d `}
                            {timeLeft.hours > 0 && `${timeLeft.hours}h `}
                            {timeLeft.minutes}m {timeLeft.seconds}s
                          </span>
                        ) : (
                          "Ended"
                        )}
                      </h3>

                    </div>
                    <img
                      src={product?.images[0]}
                      alt={product.productName}
                      className="h-[200px] object-cover w-full rounded-2xl"
                    />
                    <div className="w-full flex justify-between items-center mt-4">
                      <h1 className="text-gray flex items-center gap-1">
                        <BiCategoryAlt />
                        <span className='text-nowrap max-w-[80px] overflow-hidden text-ellipsis'>

                        {product?.productCategory?.name}
                        </span>
                      </h1>
                      <h1 className="text-gray flex items-center gap-1 ">
                        <FaLocationDot />
                        <span className='text-nowrap max-w-[80px] overflow-hidden text-ellipsis'>
                        {product.location}

                        </span>
                      </h1>
                    </div>
                    <h1 className="text-20 mt-4 font-bold text-white">{product?.productName}</h1>
                    <h1 className="text-14 font-semibold text-gray mt-4">
                      Price Starting From <span className="font-bold text-purplelight">{product.price}</span>
                    </h1>
                    <button onClick={() => handleSelectProduct(product)} className="w-full py-2 text-center text-white border border-purplelight my-4 rounded-md hover:bg-purplelight anim3">
                      Add Bid
                    </button>
                  </div>
                </div>
              )
            })}
          </Slider>

        </div>
      </div>
      {openProductmodal &&
        <ProductBidModal
          selectedProduct={selectedProduct}
          handleConfirmBid={handleConfirmBid}
          handelCloseProductModal={handelCloseProductModal}
          setBidPrice={setBidPrice}
        />

      }
    </>

  )
}

export default AuctionProducts
