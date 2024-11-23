'use client'

import { useState } from "react"


export const useCategories = ()=>{
    const [openProductmodal,setOpenProductModal] = useState(false)
    const [selectedProduct,setSelectedProduct] = useState(null)

    const handleSelectProduct = (product) =>{
        setSelectedProduct(product)
        setOpenProductModal(true)
      }
    
      const handelCloseProductModal= ()=>{
        setOpenProductModal(false)
      }
      const handleConfirmBid = ()=>{
        alert('You bid has been placed, please check you profile for more information about bid')
        setOpenProductModal(false)
      }
    return{
        openProductmodal,
        selectedProduct,
        handelCloseProductModal,
        handleSelectProduct,
        handleConfirmBid

    }
}
