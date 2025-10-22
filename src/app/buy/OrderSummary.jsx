'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Quantity from '../details/Quantity'
import { RiMastercardFill } from "react-icons/ri";
import { RiVisaLine } from "react-icons/ri";
import { FaPaypal } from "react-icons/fa";
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function OrderSummary() {
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [paymentMethod, setPaymentMethod] = useState('visa')
    const [cardNumber, setCardNumber] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvc, setCvc] = useState('')
    const counter = useSelector((state) => state.counter.value)

    useEffect(() => {
        const saved = localStorage.getItem('clickedProduct')
        if (saved) setProduct(JSON.parse(saved))
    }, [])

    const handleQuantityChange = (newQty) => setQuantity(newQty)

    const totalPrice = product ? (product.price * counter).toFixed(2) : 0

    const paymentOptions = [
        { id: 'visa', icon: <RiVisaLine /> },
        { id: 'mastercard', icon: <RiMastercardFill /> },
        { id: 'paypal', icon: <FaPaypal /> },
    ]
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full bg-white rounded-xl p-6 border border-gray-200 relative"
        >
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-3">Order Summary</h2>

            <div className='border-b border-gray-200 mb-5'>
                <div className="flex items-center justify-between py-2 px-2 border bg-gray-100 border-gray-300 sm:rounded-3xl rounded-4xl mb-5 focus:ring-2 focus:ring-green-800">
                    <input
                        type="text"
                        placeholder="Enter Coupon Code"
                        className="flex-1 px-3 py-2 rounded-xl focus:outline-none"
                    />
                    <button className="sm:ml-2 sm:mr-0 -ml-3 px-4 py-2 text-xs cursor-pointer bg-green-900 text-white rounded-3xl hover:bg-green-950/90 transition whitespace-nowrap">
                        Apply coupon
                    </button>
                </div>
            </div>


            {product ? (
                <div className="flex flex-col gap-4 ">
                    {/* Product */}
                    <div className="flex items-center gap-4">
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-16 h-16 object-cover rounded-lg bg-gray-200"
                        />
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-700 truncate w-full">
                                {product.title}
                            </h3>
                            <p className="text-sm text-gray-500">{product.brand}</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">${product.price}</p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 font-medium">Quantity</span>
                        <Quantity value={quantity} onChange={handleQuantityChange} />
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200" />

                    {/* Total */}
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-900">Total</span>
                        <span className="text-lg font-bold text-gray-900">${totalPrice}</span>
                    </div>
                    {/* Checkout Button */}
                    <Link href={'/payment'}>
                        <button className="w-full px-4 py-2 bg-black text-white rounded-3xl hover:bg-black/80 cursor-pointer transition mt-3">
                            Checkout
                        </button>
                    </Link>
                </div>
            ) : (
                <p className="text-gray-500 text-center">No product selected.</p>
            )
            }
        </motion.div >
    )
}
