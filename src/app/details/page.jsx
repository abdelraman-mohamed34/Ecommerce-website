'use client'
import React, { useEffect, useState } from 'react'
import { Rating, Skeleton, useMediaQuery } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Quantity from './Quantity'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsApi } from '../features/counter/productsSlice'
import { CiClock1 } from 'react-icons/ci'
import Comments from '../Comments'
import ContentImg from './ContentImg'
import ShopSimilar from './ShopSimilar'

export default function Details() {
    const [product, setProduct] = useState(null)
    const [animateKey, setAnimateKey] = useState(0)
    const { colors, color } = useSelector((state) => state.theme)
    const theme = colors[color]
    const dispatch = useDispatch()

    useEffect(() => {
        const saved = localStorage.getItem('clickedProduct')
        setProduct(JSON.parse(saved))
    }, [])

    useEffect(() => {
        dispatch(fetchProductsApi())
    }, [dispatch])

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15 } }
    }
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    console.log(product)

    const outOfStock = product?.availabilityStatus !== 'In Stock'
    const stock = !outOfStock ? product?.stock : 0
    const priceBeforeDiscount = product?.price + product?.price * product?.discountPercentage / 100

    return (
        <div className={`mx-auto md:px-20 sm:px-10 sm:py-5 pb-10 min-h-screen transition-colors duration-500 ${theme.bg} ${theme.text}`}>
            {/* Product main section */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={animateKey}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid md:grid-cols-2 grid-cols-1 gap-6 sm:rounded-lg overflow-hidden"
                >
                    {/* img */}
                    <ContentImg />

                    {/* Details */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col p-4 sm:px-15 px-7"

                    >
                        <motion.div variants={itemVariants} className='sm:pt-5'>
                            {product ? (
                                <>
                                    <h1 className="text-3xl font-bold">{product.title}</h1>
                                    <p className="mt-1 text-md opacity-80">{product.brand}</p>
                                    <Rating
                                        name="read-only"
                                        value={Math.floor(product.rating)}
                                        readOnly
                                        size="medium"
                                        sx={{
                                            '& .MuiRating-iconEmpty': { color: '#919191' },
                                        }}
                                    />
                                    <section className={`pt-3 sm:mt-0 mt-3 ${theme.topBorder} ${theme.secondText}`}>
                                        <h3>Description</h3>
                                        <p className={`my-2 text-sm opacity-90 ${theme.disText}`}>{product.description || 'No description available.'}</p>
                                    </section>

                                </>
                            ) : (
                                <>
                                    <Skeleton variant="text" width="60%" height={40} />
                                    <Skeleton variant="text" width="40%" height={20} />
                                    <Skeleton variant="rectangular" width="100%" height={60} className="my-4" />
                                    <Skeleton variant="rectangular" width="30%" height={30} />
                                </>
                            )}
                        </motion.div>

                        <motion.div variants={itemVariants} className={`${theme.bottomBorder} py-5`}>
                            {product ? (
                                <span className="flex items-center gap-3">
                                    <p className="text-2xl font-semibold text-green-500">${product?.price.toFixed(2)}</p>
                                    {priceBeforeDiscount - product?.price >= 1 && (
                                        <p className="text-lg text-gray-500 line-through">${priceBeforeDiscount.toFixed(2)}</p>
                                    )}
                                </span>
                            ) : (
                                <Skeleton variant="text" width="30%" height={30} />
                            )}
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-6">
                            {product ? (
                                <>
                                    <div className='flex items-center gap-3 mb-3'>
                                        {!outOfStock && <Quantity />}
                                        {product?.stock <= 50 && !outOfStock ? (
                                            <p className="text-sm opacity-70">
                                                Only <span className='mx-1 text-orange-500'> {stock} </span> items left! <br /> Don't miss it
                                            </p>
                                        ) : null}
                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-2 w-full">
                                        <button className={`px-4 py-2 rounded-3xl ${outOfStock ? theme.img_bg : 'bg-green-800 hover:bg-green-900'} text-white  transition`}>
                                            Add to Cart
                                        </button>

                                        <Link href={'/buy'}>
                                            <button disabled={outOfStock ? true : false} className={`px-4 py-2 border ${outOfStock ? 'border-gray-500 text-gray-500' : 'border-green-800'} rounded-3xl transition`}>
                                                Buy Now
                                            </button>
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <Skeleton variant="rectangular" width="100%" height={100} />
                            )}
                        </motion.div>
                    </motion.div>

                </motion.div>
            </AnimatePresence>

            <div className={`py-5 mt-5`}>
                <Comments />
            </div>

            {/* Shop Similar */}
            <ShopSimilar />

        </div >
    )
}
