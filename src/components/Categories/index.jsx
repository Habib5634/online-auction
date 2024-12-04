'use client'
import { fetchCategories } from '@/Store/Actions/userActions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { FaMobileAlt, FaTshirt, FaHome, FaRunning, FaCar, FaBook, FaHeartbeat, FaCouch, FaUtensils, FaPuzzlePiece } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';


const data = [
  {
    id: 1,
    title: 'Electronics',
    desc: 'Latest gadgets and tech accessories for all your needs.',
    icon: <FaMobileAlt className="text-purplelight group-hover:text-white anim3" size={90} />,
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
  const router = useRouter()
  const { categories } = useSelector((state) => state.categories)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])
  const handleCategoryClick = () => {
    router.push('/category')
  }
  const getCategoryIcon = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case 'electronics':
        return <FaMobileAlt className="text-purplelight group-hover:text-white anim3" size={90} />;
      case 'fashion':
        return <FaTshirt className="text-purplelight  group-hover:text-white anim3" size={90} />;
      case 'home appliances':
        return <FaHome className="text-purplelight  group-hover:text-white anim3" size={90} />;
      case 'sports and outdoors':
        return <FaRunning className="text-purplelight  group-hover:text-white anim3" size={90} />;
      case 'automobile':
        return <FaCar className="text-purplelight  group-hover:text-white anim3" size={90} />;
      case 'book and education':
        return <FaBook className="text-purplelight  group-hover:text-white anim3" size={90} />;
      case 'health and beauty':
        return <FaHeartbeat className="text-purplelight  group-hover:text-white anim3" size={90} />;
      case 'furniture':
        return <FaCouch className="text-purplelight  group-hover:text-white anim3" size={90} />;
      case 'food and beverages':
        <FaUtensils className="text-purplelight  group-hover:text-white anim3" size={90} />;
      case 'toys and games':
        return <FaPuzzlePiece className="text-purplelight  group-hover:text-white anim3" size={90} />;
      default:
        return null; // Optional: Add a default icon or handle categories without icons
    }
  };
  return (
    <div id='category' className='bg-purpledark  px-6 md:px-10 py-32 xl:py-40 w-full relative overflow-hidden'>
      <div className=' max-w-[1440px] mx-auto w-full gap-5 relative z-[0.1]'>
        <h1 className='text-[35px] md:text-[40px] text-center lg:text-[48px] xl:text-[60px] text-white font-medium mb-8 leading-tight'>Popular Categories</h1>

        {/* <div className='grid grid-cols-2 mt-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'> */}
        <Slider {...sliderSettings} className='space-x-2 '>

          {categories?.map((data) => (
            <Link key={data?._id} href={`/category/${data?._id}`}>
              <div onClick={handleCategoryClick} key={data.id} className="p-4 h-[260px] ">
                <div className="p-4 flex flex-col items-center border h-full  border-purplelight group hover:bg-purple anim3 cursor-pointer rounded-2xl ">

                  {getCategoryIcon(data.name)}

                  <h1 className="text-20 mt-4 font-bold text-white text-center">{data.name}</h1>
                  <h1 className="text-14 font-semibold text-gray mt-4 text-center">
                    {data.description}
                  </h1>

                </div>
              </div>
            </Link>
          ))}
        </Slider>

      </div>
    </div>
    // </div>
  )
}

export default Categories
