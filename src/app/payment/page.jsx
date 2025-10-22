'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import OrderSummary from '../buy/OrderSummary'

export default function PaymentPage() {
    const [card, setCard] = useState({
        name: '',
        number: '',
        expiry: '',
        cvv: '',
    })

    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        setCard(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(card)
        setSubmitted(true)
        setTimeout(() => {
            setSubmitted(false)
            setCard({ name: '', number: '', expiry: '', cvv: '' })
        }, 2000) // تظهر الرسالة لمدة ثانيتين
    }

    return (
        <div className="min-h-screen grid grid-cols-1 grid-rows-[92vh_1fr] md:grid-cols-2 bg-gray-100">

            {/* Form */}
            <div className="flex items-center justify-center p-6 row-span-2">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-xl rounded-2xl p-8 w-full h-full"
                >
                    <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">Payment</h2>

                    {submitted && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center font-semibold"
                        >
                            Payment processed successfully!
                        </motion.div>
                    )}

                    <form className="space-y-7">
                        <motion.div whileFocus={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                            <input
                                type="text"
                                name="name"
                                value={card.name}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-700 focus:outline-none"
                            />
                        </motion.div>

                        <motion.div whileFocus={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                            <input
                                type="text"
                                name="number"
                                value={card.number}
                                onChange={handleChange}
                                required
                                placeholder="1234 5678 9012 3456"
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-700 focus:outline-none"
                            />
                        </motion.div>

                        <div className="flex gap-4">
                            <motion.div className="flex-1" whileFocus={{ scale: 1.02 }}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                                <input
                                    type="text"
                                    name="expiry"
                                    value={card.expiry}
                                    onChange={handleChange}
                                    required
                                    placeholder="MM/YY"
                                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-700 focus:outline-none"
                                />
                            </motion.div>
                            <motion.div className="flex-1" whileFocus={{ scale: 1.02 }}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                <input
                                    type="text"
                                    name="cvv"
                                    value={card.cvv}
                                    onChange={handleChange}
                                    required
                                    placeholder="123"
                                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-700 focus:outline-none"
                                />
                            </motion.div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-900 text-white font-semibold py-2 rounded-full hover:bg-green-800 transition md:hidden"
                        >
                            Pay Now
                        </button>
                    </form>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-r from-green-700 to-green-500 text-white rounded-3xl w-full lg:h-60 sm:h-50 p-6 shadow-2xl relative mt-10"
                    >
                        <div className="text-sm mb-4">Card Preview</div>
                        <div className="text-xl font-mono tracking-widest mb-6">
                            {card.number || '#### #### #### ####'}
                        </div>
                        <div className="flex justify-between items-end absolute bottom-6 left-6 right-6">
                            <div className="text-sm">{card.name || 'CARDHOLDER NAME'}</div>
                            <div className="text-sm">{card.expiry || 'MM/YY'}</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Card Preview */}
            <div className="hidden flex-col items-center justify-center p-6 bg-gray-200/70 sticky top-15 h-full md:flex">
                <OrderSummary />
            </div>
        </div>
    )
}
