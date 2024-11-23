'use client'
import Category from '@/components/Category'
import React, { Suspense } from 'react'

const CategoryPage = () => {
  return (
    <Suspense fallback={'Loading...'}>
      <Category/>
    </Suspense>
  )
}

export default CategoryPage
