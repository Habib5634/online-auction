'use client'
import React from 'react'
import { FaMobileAlt,FaTshirt,FaHome,FaRunning ,FaCar,FaBook,FaHeartbeat,FaCouch,FaUtensils,FaPuzzlePiece} from "react-icons/fa";
import Slider from 'react-slick';


  const data = [
    {
        id: 1,
        title: 'Electronics',
        desc: 'Latest gadgets and tech accessories for all your needs.',
        icon: <FaMobileAlt  className="text-purplelight group-hover:text-white anim3" size={90} />,
        productsAvailable: 120
    },
    {
        id: 2,
        title: 'Fashion',
        desc: 'Trendy apparel and accessories to elevate your wardrobe.',
        icon: <FaTshirt className="text-purplelight  group-hover:text-white anim3" size={90} />,
        productsAvailable: 150
    },
    {
        id: 3,
        title: 'Home Appliances',
        desc: 'High-quality appliances to make your home more efficient.',
        icon: <FaHome className="text-purplelight  group-hover:text-white anim3" size={90} />,
        productsAvailable: 80
    },
    {
        id: 4,
        title: 'Sports & Outdoors',
        desc: 'Everything you need for outdoor adventures and fitness.',
        icon: <FaRunning className="text-purplelight  group-hover:text-white anim3" size={90} />,
        productsAvailable: 100
    },
    {
        id: 5,
        title: 'Automobiles',
        desc: 'Cars, bikes, and accessories for all automobile enthusiasts.',
        icon: <FaCar className="text-purplelight  group-hover:text-white anim3" size={90} />,
        productsAvailable: 50
    },
    {
        id: 6,
        title: 'Books & Education',
        desc: 'A wide range of books and educational materials for all ages.',
        icon: <FaBook className="text-purplelight  group-hover:text-white anim3" size={90} />,
        productsAvailable: 200
    },
    {
        id: 7,
        title: 'Health & Beauty',
        desc: 'Top-rated health and beauty products to keep you looking your best.',
        icon: <FaHeartbeat className="text-purplelight  group-hover:text-white anim3" size={90} />,
        productsAvailable: 75
    },
    {
        id: 8,
        title: 'Furniture',
        desc: 'Comfortable and stylish furniture to transform your living space.',
        icon: <FaCouch className="text-purplelight  group-hover:text-white anim3" size={90} />,
        productsAvailable: 90
    },
    {
        id: 9,
        title: 'Food & Beverages',
        desc: 'Delicious food and beverages delivered to your door.',
        icon: <FaUtensils className="text-purplelight  group-hover:text-white anim3" size={90} />,
        productsAvailable: 60
    },
    {
        id: 10,
        title: 'Toys & Games',
        desc: 'Toys, games, and entertainment for children and adults alike.',
        icon: <FaPuzzlePiece className="text-purplelight  group-hover:text-white anim3" size={90} />,
        productsAvailable: 110
    }
];


const Categories = () => {
 
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000, // 2 seconds
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
     


    return (
        <div id='category' className='bg-purpledark  px-6 md:px-10 py-32 xl:py-40 w-full relative overflow-hidden'>
            <div className=' max-w-[1440px] mx-auto w-full gap-5 relative z-[0.1]'>
                <h1 className='text-[35px] md:text-[40px] text-center lg:text-[48px] xl:text-[60px] text-white font-medium mb-8 leading-tight'>Popular Categories</h1>
                
                {/* <div className='grid grid-cols-2 mt-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'> */}
                <Slider {...sliderSettings} className='space-x-2 '>
                    
        {data.map((data) => (
            
          <div key={data.id} className="p-4 h-full max-h-[460px] ">
          <div className="p-4 flex flex-col items-center border  border-purplelight group hover:bg-purple anim3 cursor-pointer rounded-2xl ">
            
            {data.icon}
            
            <h1 className="text-20 mt-4 font-bold text-white text-center">{data.title}</h1>
            <h1 className="text-14 font-semibold text-gray mt-4 text-center">
              {data.desc}
            </h1>
       
          </div>
          </div>
        ))}
      </Slider>

            </div>
            </div>
        // </div>
    )
}

export default Categories
