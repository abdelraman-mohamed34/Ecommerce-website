'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Quantity from '../details/Quantity'
import { useSelector } from 'react-redux'

export default function Review() {
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const saved = localStorage.getItem('clickedProduct')
        if (saved) setProduct(JSON.parse(saved))
    }, [])

    const counter = useSelector((state) => state.counter.value)

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full bg-white rounded-2xl p-6 border border-gray-200 transition-shadow duration-300 lg:sticky top-29"
        >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Review</h2>

            {product ? (
                <>
                    <div className="flex md:flex-row flex-col md:items-center gap-4">
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            className="md:w-60 aspect-square object-cover rounded-xl bg-gray-100 border border-gray-200 transition-transform duration-300"
                        />
                        <div className="flex-1">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-1">
                                {product.title}
                            </h3>
                            <p className="text-sm text-gray-500">{product.brand}</p>
                        </div>
                        <div className="flex flex-col md:items-end justify-between gap-2">
                            <p className="text-lg font-bold text-green-700">${product.price}</p>
                            <span className="text-sm text-gray-600 font-medium">
                                Quantity: <span className="text-gray-800">{counter}</span>
                            </span>
                        </div>
                    </div>
                    {/* 
                    <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between text-gray-700 font-medium">
                            <span>Subtotal</span>
                            <span>${(product.price * counter).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-500 text-sm mt-1">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between font-bold text-gray-900 mt-3 text-lg">
                            <span>Total</span>
                            <span>${(product.price * counter).toFixed(2)}</span>
                        </div>
                    </div> */}

                    {/* <button
                        className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
                    >
                        Proceed to Payment
                    </button> */}
                </>
            ) : (
                <p className="text-gray-500 text-center">No product selected.</p>
            )}
        </motion.div>

    )
}
