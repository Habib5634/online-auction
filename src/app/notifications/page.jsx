'use client'
import Notifications from '@/components/Notifications'
import React, { Suspense } from 'react'

const NotificationPage = () => {
  return (
    <Suspense fallback={'Loading....'}>
      <Notifications/>
    </Suspense>
  )
}

export default NotificationPage
