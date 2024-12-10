'use client'
import { fetchNotifications } from '@/Store/ReduxSlice/notificationSlice'
import { clearAuth } from '@/Store/ReduxSlice/userSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaRegUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

const ProfileMenu = () => {
    const [openMenu,setOpenMenu] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()
    const handleOpenMenu = ()=>{
        setOpenMenu(!openMenu)
    }
    const handleLogout = async()=>{
      try {
          localStorage.removeItem('token')
        dispatch(clearAuth());
        toast.success("Logout Successfully")
        router.push('/login')
     
      } catch (error) {
        console.log(error)
      }
    }
    const { notifications } = useSelector((state) => state.notifications);

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);
  return (
    <div className=''>
      <div className='relative'>
      <FaRegUserCircle className='text-white' size={25}  onClick={handleOpenMenu}/>
      <div className='h-5 w-5 rounded-full text-white bg-red absolute -top-3 -right-3 flex justify-center items-center'>{notifications?.filter((noti,i)=>!noti.isRead)?.length}</div>
      </div>
      <div className={`${openMenu ? 'min-h-full p-3 shadow-shad':'h-0 overflow-hidden'}  absolute right-0 rounded-lg flex flex-col gap-2 items-start bg-white w-full max-w-[150px] anim3`}>
       <Link href={'/profile'}> <button className='font-semibold '>Profile</button></Link>
        <Link href={'/notifications'}><button className='font-semibold '>Notification <span className='text-red font-semibold'>{notifications?.filter((noti,i)=>!noti.isRead)?.length}</span>{}</button></Link>
        <button onClick={handleLogout} className='font-semibold '>Logout</button>
      </div>
    </div>
  )
}

export default ProfileMenu
