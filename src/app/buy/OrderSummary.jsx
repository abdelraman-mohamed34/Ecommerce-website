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

    const { colors, color } = useSelector((state) => state.theme)
    const theme = colors[color]

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`w-full h-full sm:rounded-xl p-6 relative transition-all duration-300 
            ${theme.cardBg} ${theme.cardText}  ${theme.border_small}`}
        >
            <h2 className={`text-xl font-bold mb-4  pb-3 ${theme.text} ${theme.bottomBorder}`}>
                Order Summary
            </h2>

            <div className={`${theme.bottomBorder} mb-5`}>
                <div className={`flex items-center justify-between py-2 px-2  ${theme.bg} ${theme.border} sm:rounded-3xl rounded-lg sm:mb-5 mb-1`}>
                    <input
                        type="text"
                        placeholder="Enter Coupon Code"
                        className={`flex-1 px-3 py-2 rounded-xl focus:outline-none ${theme.text} bg-transparent`}
                    />
                    <button className="sm:ml-2 sm:mr-0 sm:flex hidden -ml-3 px-4 py-2 text-xs cursor-pointer bg-green-900 text-white rounded-3xl hover:bg-green-950/90 transition whitespace-nowrap">
                        Apply coupon
                    </button>
                </div>
                <button className="sm:hidden flex justify-center px-4 mb-5 py-2 w-full text-xs cursor-pointer bg-green-900 text-white rounded-lg hover:bg-green-950/90 transition whitespace-nowrap">
                    Apply coupon
                </button>
            </div>

            {product ? (
                <div className="flex flex-col gap-4">
                    {/* Product */}
                    <div className="flex items-center gap-4">
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            className={`w-16 h-16 object-cover rounded-lg ${theme.img_bg}`}
                        />
                        <div className="flex-1">
                            <h3 className={`text-sm font-medium truncate w-full ${theme.text}`}>
                                {product.title}
                            </h3>
                            <p className="text-sm opacity-80">{product.brand}</p>
                            <p className={`sm:hidden flex text-sm font-semibold ${theme.accent}`}>${product.price}</p>
                        </div>
                        <p className={`sm:flex hidden text-sm font-semibold ${theme.cardPrice}`}>
                            ${product.price}
                        </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium opacity-90">Quantity</span>
                        <Quantity value={quantity} onChange={handleQuantityChange} />
                    </div>

                    {/* Divider */}
                    <div className={`${theme.topBorder}`} />

                    {/* Total */}
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold opacity-90">Total</span>
                        <span className={`text-lg font-bold ${theme.accent}`}>${totalPrice}</span>
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
            )}
        </motion.div>
    )
}
