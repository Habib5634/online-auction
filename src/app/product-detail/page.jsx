'use client'
import Product from '@/components/Product'
import React, { Suspense } from 'react'

const ProductDetailPage = () => {
  return (
    <Suspense fallback={'Loading...'}>
      <Product/>
    </Suspense>
  )
}

export default ProductDetailPage
