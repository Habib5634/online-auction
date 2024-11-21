'use client'
import Login from '@/components/Login'
import Navbar from '@/components/Navbar'
import React from 'react'

const LoginPage = () => {
  return (
      <>
      <div className='bg-purpledark'>

      <Navbar/>
      </div>
      <div className='bg-aboutbg bg-cover  px-6 md:px-10 h-screen -mt-[81px] w-full  overflow-hidden relative'>
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <Login/>
    </div>
    </>
  )
}

export default LoginPage