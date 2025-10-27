'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

export default function Review() {
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const saved = localStorage.getItem('clickedProduct')
        if (saved) setProduct(JSON.parse(saved))
    }, [])

    const counter = useSelector((state) => state.counter.value)
    const { colors, color } = useSelector((state) => state.theme)
    const theme = colors[color]

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`w-full h-full sm:rounded-2xl p-6 transition-shadow duration-300 lg:sticky top-29 ${theme.cardBg} ${theme.cardText} ${theme.border_small}`}
        >
            <h2 className="text-xl font-bold mb-4">Review</h2>

            {product ? (
                <>
                    <div className="flex md:flex-row flex-col md:items-center gap-4">
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            className={`md:w-60 aspect-square object-cover rounded-xl transition-transform duration-300 ${theme.img_bg}`}
                        />
                        <div className="flex-1">
                            <h3 className="text-2xl font-semibold mb-1">{product.title}</h3>
                            <p className="text-sm opacity-80">{product.brand}</p>
                        </div>
                        <div className="flex flex-col md:items-end justify-between gap-2">
                            <p className={`text-lg font-bold ${theme.accent}`}>${product.price}</p>
                            <span className="text-sm opacity-80 font-medium">
                                Quantity: <span className={theme.text}>{counter}</span>
                            </span>
                        </div>
                    </div>
                </>
            ) : (
                <p className="text-center opacity-70">No product selected.</p>
            )}
        </motion.div>
    )
}
