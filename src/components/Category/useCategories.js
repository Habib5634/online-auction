'use client'

import { addBidOnProduct } from "@/Store/Actions/userActions"
import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"


export const useCategories = ()=>{
    const [openProductmodal,setOpenProductModal] = useState(false)
    const [selectedProduct,setSelectedProduct] = useState(null)
    const [bidPrice, setBidPrice] = useState('');
    const { isLoading, error, successMessage } = useSelector((state) => state.bids);
    const { userData } = useSelector((state) => state.userData)
    const dispatch = useDispatch();
    const handleSelectProduct = (product) =>{
        setSelectedProduct(product)
        setOpenProductModal(true)
      }
   
    
      const handelCloseProductModal= ()=>{
        setOpenProductModal(false)
      }
      const handleConfirmBid = async(e)=>{
        // alert('You bid has been placed, please check you profile for more information about bid')
        // setOpenProductModal(false)
        e.preventDefault();
        if (userData?._id === selectedProduct?.sellerId?._id) {
            toast.error("You are the seller of this product. You cant place bi on this product")
            setOpenProductModal(false)
            setSelectedProduct(null)
        } else {

            try {
                dispatch(addBidOnProduct({ productId: selectedProduct?._id, bidPrice }));
                console.log(successMessage)
                if (successMessage === 'Bid Added successfully') {
                    toast.success(successMessage)
                    setBidPrice("")
                    setOpenProductModal(false)
                    setSelectedProduct(null)

                } else {
                    toast.error(successMessage)
                    setOpenProductModal(false)
                    setSelectedProduct(null)
                }
                
            } catch (error) {
                setOpenProductModal(false)
                console.log(error)
                setSelectedProduct(null)
            }
        }
      }
    


    return{
        openProductmodal,
        selectedProduct,
        handelCloseProductModal,
        handleSelectProduct,
        handleConfirmBid,
        setBidPrice

    }
}
