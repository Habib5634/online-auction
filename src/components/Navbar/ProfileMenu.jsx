'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'

const ProfileMenu = () => {
    const [openMenu,setOpenMenu] = useState(false)
    const router = useRouter()
    
    const handleOpenMenu = ()=>{
        setOpenMenu(!openMenu)
    }
    const handleLogout = ()=>{
        localStorage.removeItem('user')
        router.push('/login')
    }
  return (
    <div className=''>
      <FaRegUserCircle className='text-white' size={25}  onClick={handleOpenMenu}/>
      <div className={`${openMenu ? 'min-h-full p-3 shadow-shad':'h-0 overflow-hidden'}  absolute right-0 rounded-lg flex flex-col gap-2 items-start bg-white w-full max-w-[150px] anim3`}>
       <Link href={'/profile'}> <button className='font-semibold '>Profile</button></Link>
        <button className='font-semibold '>Notification</button>
        <button onClick={handleLogout} className='font-semibold '>Logout</button>
      </div>
    </div>
  )
}

export default ProfileMenu
