'use client'
import Navbar from '@/components/Navbar'
import Notifications from '@/components/Notifications'
import React, { Suspense } from 'react'

const NotificationPage = () => {
  return (
    <Suspense fallback={'Loading....'}>
      <div className='bg-purpledark min-h-screen'>
<Navbar/>
      <Notifications/>
      </div>
    </Suspense>
  )
}

export default NotificationPage
