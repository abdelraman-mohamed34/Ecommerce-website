'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { RiMastercardFill, RiVisaLine } from 'react-icons/ri'
import { FaPaypal } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Visa from './Visa'

export default function PaymentPage() {
    const [card, setCard] = useState({
        name: '',
        number: '',
        expiry: '',
        cvv: '',
    })

    const [errors, setErrors] = useState({})
    const [isProcessing, setIsProcessing] = useState(false)
    const [product, setProduct] = useState(null)
    const quantity = useSelector(state => {
        if (!product) return 1
        return state.counter.quantities[product.id] || 1
    })
    const router = useRouter()
    const { colors, color } = useSelector((state) => state.theme)
    const theme = colors[color]

    useEffect(() => {
        const saved = localStorage.getItem('clickedProduct')
        if (saved) setProduct(JSON.parse(saved))
    }, [])

    const validateForm = () => {
        const newErrors = {}
        if (!card.name.trim()) newErrors.name = 'Cardholder name is required'
        if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(card.number))
            newErrors.number = 'Enter a valid 16-digit card number'
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry))
            newErrors.expiry = 'Enter a valid expiry date (MM/YY)'
        if (!/^\d{3}$/.test(card.cvv)) newErrors.cvv = 'CVV must be 3 digits'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validateForm()) return
        setIsProcessing(true)
        setTimeout(() => {
            setIsProcessing(false)
            router.push('/')
        }, 2000)
    }

    const totalPrice = product ? (product.price * quantity).toFixed(2) : 0

    return (
        <div className={`min-h-screen grid grid-cols-1 xl:grid-cols-[1fr_35rem] lg:grid-cols-2 transition-all duration-500 ${theme.bg}`}>
            {/* Form */}
            <div className="flex items-center justify-center sm:p-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`sm:p-10 p-5 w-full h-full transition-all duration-300`}
                >
                    <h2 className={`sm:text-4xl text-3xl font-extrabold ${theme.accent} sm:mb-8 mb-5 text-center tracking-tight`}>
                        Payment Details
                    </h2>

                    <form className="sm:space-y-6 space-y-3" onSubmit={handleSubmit} noValidate>
                        {/* Cardholder Name */}
                        <div>
                            <label className={`block text-sm font-semibold mb-2 ${theme.text}`}>
                                Cardholder Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={card.name}
                                onChange={(e) => setCard({ ...card, name: e.target.value })}
                                placeholder="Enter the name on your card"
                                className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} sm:rounded-xl rounded-md p-3.5 ${theme.cardText} placeholder-gray-400 shadow-sm focus:ring-4 focus:ring-green-600/30 focus:border-green-700 transition-all duration-200 outline-none ${theme.cardBg}`}
                            />
                            {errors.name && <p className="text-red-500 sm:text-sm text-xs mt-1">{errors.name}</p>}
                        </div>

                        {/* Card Number */}
                        <div>
                            <label className={`block text-sm font-semibold mb-2 ${theme.text}`}>
                                Card Number
                            </label>
                            <input
                                type="text"
                                name="number"
                                value={card.number}
                                onChange={(e) => {
                                    let value = e.target.value.replace(/\D/g, '').slice(0, 16)
                                    value = value.replace(/(.{4})/g, '$1 ').trim()
                                    setCard({ ...card, number: value })
                                }}
                                placeholder="XXXX XXXX XXXX XXXX"
                                className={`w-full border ${errors.number ? 'border-red-500' : 'border-gray-300'} sm:rounded-xl rounded-md p-3.5 ${theme.cardText} placeholder-gray-400 shadow-sm focus:ring-4 focus:ring-green-600/30 focus:border-green-700 transition-all duration-200 outline-none tracking-widest ${theme.cardBg}`}
                            />
                            {errors.number && <p className="text-red-500 sm:text-sm text-xs mt-1">{errors.number}</p>}
                        </div>

                        <div className='flex gap-6'>
                            <div className='xl:flex lg:hidden sm:flex hidden w-full'>
                                <Visa name={card.name} expiry={card.expiry} number={card.number} />
                            </div>

                            {/* Expiry & CVV */}
                            <div className="flex xl:flex-col lg:flex-row sm:flex-col gap-5 min-w-70 w-full">
                                <div className="flex-1">
                                    <label className={`block text-sm font-semibold mb-2 ${theme.text}`}>
                                        Expiry Date
                                    </label>
                                    <input
                                        type="text"
                                        name="expiry"
                                        value={card.expiry}
                                        onChange={(e) => {
                                            let v = e.target.value.replace(/\D/g, '').slice(0, 4)
                                            if (v.length >= 3) v = `${v.slice(0, 2)}/${v.slice(2)}`
                                            const [month] = v.split('/')
                                            if (month && parseInt(month) > 12) v = `12/${v.slice(3)}`
                                            if (month === '00') v = `01/${v.slice(3)}`
                                            setCard({ ...card, expiry: v })
                                        }}
                                        placeholder="MM/YY"
                                        className={`w-full border ${errors.expiry ? 'border-red-500' : 'border-gray-300'} sm:rounded-xl rounded-md p-3.5 ${theme.cardText} placeholder-gray-400 shadow-sm focus:ring-4 focus:ring-green-600/30 focus:border-green-700 transition-all duration-200 outline-none tracking-widest ${theme.cardBg}`}
                                    />
                                    {errors.expiry && <p className="text-red-500 sm:text-sm text-xs mt-1">{errors.expiry}</p>}
                                </div>

                                <div className="flex-1">
                                    <label className={`block text-sm font-semibold mb-2 ${theme.text}`}>
                                        CVV
                                    </label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={card.cvv}
                                        onChange={(e) => {
                                            const v = e.target.value.replace(/\D/g, '').slice(0, 3)
                                            setCard({ ...card, cvv: v })
                                        }}
                                        placeholder="123"
                                        className={`w-full border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} sm:rounded-xl rounded-md p-3.5 ${theme.cardText} placeholder-gray-400 shadow-sm focus:ring-4 focus:ring-green-600/30 focus:border-green-700 transition-all duration-200 outline-none tracking-widest ${theme.cardBg}`}
                                    />
                                    {errors.cvv && <p className="text-red-500 sm:text-sm text-xs mt-1">{errors.cvv}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Card Preview */}
                        <div className='xl:hidden lg:block sm:hidden'>
                            <Visa name={card.name} expiry={card.expiry} number={card.number} />
                        </div>

                        {/* Pay Now Button */}
                        <motion.button
                            type="submit"
                            disabled={isProcessing}
                            whileHover={!isProcessing ? { scale: 1.02 } : {}}
                            whileTap={!isProcessing ? { scale: 0.98 } : {}}
                            className={`w-full py-3.5 rounded-full shadow-md font-semibold text-white transition-all duration-300 ${isProcessing ? 'bg-green-400 cursor-not-allowed' : 'bg-gradient-to-r from-green-800 to-green-600 hover:shadow-lg'}`}
                        >
                            {isProcessing ? 'Processing...' : 'Pay Now'}
                        </motion.button>
                    </form>


                </motion.div>
            </div >

            {/* Order Summary */}
            <div div className={`hidden lg:flex flex-col items-center justify-center h-[92vh] ${theme.nav} sticky top-17`}>
                <div className={`w-full h-full p-6 relative shadow-lg ${theme.cardBg} ${theme.cardText}`}>
                    <h2 className={`text-xl font-bold mb-4 pb-3 border-b border-gray-300 ${theme.text}`}>
                        Order Summary
                    </h2>

                    {product ? (
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="w-16 h-16 object-cover rounded-lg bg-gray-200"
                                />
                                <div className="flex-1">
                                    <h3 className={`text-sm font-medium truncate w-full ${theme.cardText}`}>
                                        {product.title}
                                    </h3>
                                    <p className="text-sm opacity-80">{product.brand}</p>
                                    <p className={`sm:hidden flex text-sm font-semibold ${theme.accent}`}>${product.price}</p>
                                </div>
                                <p className={`sm:flex hidden text-sm font-semibold ${theme.cardPrice}`}>${product.price}</p>
                            </div>

                            <div className="border-t-2 border-gray-300 py-10 absolute w-full bottom-0 left-0 px-5">
                                <div className="flex items-center justify-between">
                                    <span className={`text-lg font-semibold ${theme.text}`}>Total</span>
                                    <span className={`text-lg font-bold ${theme.accent}`}>${totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">No product selected.</p>
                    )}
                </div>
            </div>
        </div >
    )
}
