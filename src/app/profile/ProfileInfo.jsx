import React from 'react'

const ProfileInfo = () => {
  return (
    <div className='flex flex-col gap-6'>
        <div className='flex flex-col md:flex-row items-start md:items-center w-full lg:max-w-[70%]'>
            <h1 className='text-20 font-bold text-blackish w-full md:w-1/2'>Name</h1>
            <h3 className='text-20 font-semibold w-full md:w-1/2 text-start'>Raja Habib Ahmed</h3>
        </div>
        <div className='flex flex-col md:flex-row items-start md:items-center w-full lg:max-w-[70%]'>
            <h1 className='text-20 font-bold text-blackish  w-full md:w-1/2 text-start'>Contact</h1>
            <h3 className='text-20 font-semibold  w-full md:w-1/2 text-start'>+92-313-5634882</h3>
        </div>
        <div className='flex flex-col md:flex-row items-start md:items-center w-full lg:max-w-[70%]'>
            <h1 className='text-20 font-bold text-blackish  w-full md:w-1/2 text-start'>Email</h1>
            <h3 className='text-20 font-semibold  w-full md:w-1/2 text-start'>habib.dev3@gmail.com</h3>
        </div>
      
      
   
    </div>
  )
}

export default ProfileInfo