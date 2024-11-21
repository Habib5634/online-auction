'use client'
import React, { useEffect, useState } from 'react'
import { BiCategoryAlt } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import Slider from 'react-slick';

const products = [
    { id: 1, name: "Yamaha 2017", category: "Bikes", location: "Karachi", price: "RS. 45,00000", image: "/assets/bike.png" ,endTime: new Date().getTime() + 10 * 60 * 1000, },
    { id: 2, name: "Suzuki Alto", category: "Cars", location: "Lahore", price: "RS. 12,00000", image: "/assets/car.png" ,endTime: new Date().getTime() + 5 * 60 * 1000,},
    { id: 3, name: "MacBook Pro", category: "Electronics", location: "Islamabad", price: "RS. 250,000", image: "/assets/macbook.png",endTime: new Date().getTime() + 140 * 60 * 1000, },
    { id: 4, name: "Canon Camera", category: "Cameras", location: "Peshawar", price: "RS. 70,000", image: "/assets/camera.png" ,endTime: new Date().getTime() + 10 * 60 * 1000,},
    { id: 5, name: "iPhone 14", category: "Mobiles", location: "Multan", price: "RS. 300,000", image: "/assets/iphone.png",endTime: new Date().getTime() + 70 * 60 * 1000, },
    { id: 6, name: "Rolex Watch", category: "Accessories", location: "Quetta", price: "RS. 1,500,000", image: "/assets/watch.png",endTime: new Date().getTime() + 10 * 60 * 1000, },
    { id: 7, name: "HP Laptop", category: "Electronics", location: "Faisalabad", price: "RS. 200,000", image: "/assets/laptop.png" ,endTime: new Date().getTime() + 99 * 60 * 1000,},
    { id: 8, name: "Gaming Chair", category: "Furniture", location: "Rawalpindi", price: "RS. 25,000", image: "/assets/chair.png",endTime: new Date().getTime() + 100 * 60 * 1000, },
    { id: 9, name: "AirPods", category: "Accessories", location: "Hyderabad", price: "RS. 50,000", image: "/assets/airpods.png",endTime: new Date().getTime() + 103 * 60 * 1000, },
    { id: 10, name: "Samsung TV", category: "Appliances", location: "Sialkot", price: "RS. 120,000", image: "/assets/tv.png" ,endTime: new Date().getTime() + 87 * 60 * 1000,},
  ]


const AuctionProducts = () => {
    const [timers, setTimers] = useState({});
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000, // 2 seconds
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
     

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        const updatedTimers = {};
        products.forEach((product) => {
          const remainingTime = Math.max(0, product.endTime - new Date().getTime());
          updatedTimers[product.id] = remainingTime;
        });
        return updatedTimers;
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };
    return (
        <div id='auctions' className='bg-purpledark  px-6 md:px-10 py-32 xl:py-40 w-full relative overflow-hidden'>
            <div className=' max-w-[1440px] mx-auto w-full gap-5 relative z-[0.1]'>
                <h1 className='text-[35px] md:text-[40px] text-center lg:text-[48px] xl:text-[60px] text-white font-medium mb-8 leading-tight'>Live Auctions</h1>
                <p className='text-white text-center mt-5 mb-10'>Discover exclusive deals and bid live on unique products in real-time</p>
                {/* <div className='grid grid-cols-2 mt-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'> */}
                <Slider {...sliderSettings} className='space-x-2 '>
                    
        {products.map((product) => (
            
          <div key={product.id} className="p-4 h-full max-h-[460px] ">
          <div className="p-4 shadow-shad  rounded-2xl relative">
            <div className='absolute -top-0 -left-0 bg-purple4 w-full max-w-[100px] rounded-tl-2xl gap-2 flex  items-center justify-center py-2'>
                <h1 className='text-white text-12'>Ends in</h1>
                <h3 className="text-white text-16 font-bold">
                {timers[product.id] !== undefined
                  ? formatTime(timers[product.id])
                  : "Loading..."}
              </h3>

            </div>
            <img
              src={product.image}
              alt={product.name}
              className="h-full max-h-[200px] object-cover w-full rounded-2xl"
            />
            <div className="w-full flex justify-between items-center mt-4">
              <h1 className="text-gray flex items-center gap-1">
                <BiCategoryAlt />
                {product.category}
              </h1>
              <h1 className="text-gray flex items-center gap-1">
                <FaLocationDot />
                {product.location}
              </h1>
            </div>
            <h1 className="text-20 mt-4 font-bold text-white">{product.name}</h1>
            <h1 className="text-14 font-semibold text-gray mt-4">
              Price Starting From <span className="font-bold text-purplelight">{product.price}</span>
            </h1>
            <button className="w-full py-2 text-center text-white border border-purplelight my-4 rounded-md hover:bg-purplelight anim3">
              Add Proposal
            </button>
          </div>
          </div>
        ))}
      </Slider>

            </div>
            </div>
        // </div>
    )
}

export default AuctionProducts
