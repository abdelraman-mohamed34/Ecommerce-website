'use client'
import React, { useEffect, useState } from 'react'
import { Rating, Skeleton, useMediaQuery } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Quantity from './Quantity'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsApi } from '../features/counter/productsSlice'
import { CiClock1 } from 'react-icons/ci'

export default function Details() {
    const [product, setProduct] = useState(null)
    const [animateKey, setAnimateKey] = useState(0)
    const products = useSelector((state) => state.productStore.products)
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

    const smallWindow = useMediaQuery('(max-width:500px)')
    const currentCategory = product?.category

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15 } }
    }
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    const filteredProducts = products?.filter(
        (p) => p.category === currentCategory && p.id !== product?.id
    )

    const clickedProduct = (p) => {
        localStorage.setItem('clickedProduct', JSON.stringify(p))
        setProduct(p)
        setAnimateKey(prev => prev + 1) // trigger animation re-render
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className={`mx-auto md:px-20 sm:px-10 sm:py-10 pb-10 min-h-screen transition-colors duration-500 ${theme.bg} ${theme.text}`}>
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
                    {/* Image */}
                    <div className='h-full'>
                        {product ? (
                            <motion.img
                                src={product.images[0]}
                                alt={product.title}
                                className="w-full h-auto sm:rounded-lg object-cover bg-gray-100"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        ) : (
                            <Skeleton variant="rectangular" height='100%' className="w-full sm:rounded-lg" />
                        )}
                    </div>

                    {/* Details */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col p-4 sm:px-15 px-7"
                    >
                        <motion.div variants={itemVariants} className='border-b border-gray-200 sm:py-10 pb-5'>
                            {product ? (
                                <>
                                    <h1 className="text-3xl font-bold">{product.title}</h1>
                                    <p className="mt-1 text-md opacity-80">{product.brand}</p>
                                    <p className="my-4 text-sm opacity-90">{product.description || 'No description available.'}</p>
                                    <Rating name="read-only" value={Math.floor(product.rating)} readOnly size="medium" />
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

                        <motion.div variants={itemVariants} className='border-b border-gray-200 py-5'>
                            {product ? (
                                <p className="text-2xl font-semibold">${product.price}</p>
                            ) : (
                                <Skeleton variant="text" width="30%" height={30} />
                            )}
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-6">
                            {product ? (
                                <>
                                    <div className='flex items-center gap-3 mb-3'>
                                        <Quantity />
                                        <p className="text-sm opacity-70">
                                            Only <span className='mx-1 text-orange-500'>12</span> items left! <br /> Don't miss it
                                        </p>
                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-2 w-full">
                                        <button className="px-4 py-2 rounded-3xl text-white bg-green-800 hover:bg-green-900 transition">
                                            Add to Cart
                                        </button>

                                        <Link href={'/buy'}>
                                            <button className="px-4 py-2 border border-green-800 rounded-3xl hover:bg-gray-100 dark:hover:bg-green-950 transition">
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

            {/* Shop Similar */}
            {filteredProducts.length !== 0 && (
                <section className='py-5 border-t-2 border-gray-100 mt-5 sm:px-0 px-5'>
                    <h1 className="text-xl font-semibold">Shop Similar</h1>
                    <div className="flex flex-col w-full items-center">
                        <div className="max-w-7xl w-full">
                            <div className="mt-6 grid gap-x-6 gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                                {filteredProducts.slice(0, 10).map((p, index) => (
                                    <motion.div
                                        key={p.id}
                                        className={`group relative rounded-md overflow-hidden hover:shadow-lg hover:scale-101 transition-all duration-300 cursor-pointer ${theme.card}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => clickedProduct(p)}
                                    >
                                        <img
                                            alt={p.title}
                                            src={p.images[0]}
                                            className="aspect-square w-full rounded-md bg-gray-200 object-cover lg:aspect-auto lg:h-80 transition-transform duration-300 group-hover:scale-105"
                                        />

                                        <div className="mt-4 px-2 flex justify-between items-center">
                                            <div>
                                                <h3 className="text-sm font-medium truncate">{p.title}</h3>
                                                <p className="text-xs opacity-70">{p.brand}</p>
                                                <p className="text-sm font-semibold">${p.price}</p>
                                            </div>
                                        </div>

                                        <div className="px-2 py-1">
                                            <Rating name="read-only" value={Math.floor(p.rating)} readOnly size="small" />
                                        </div>

                                        {p.availabilityStatus !== "In Stock" && (
                                            <div className="inline-flex items-center px-3 py-1 text-sm font-semibold rounded-l absolute bottom-27 right-0 text-gray-500 bg-yellow-300 shadow">
                                                <CiClock1 className="mr-1" /> Out of Stock
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}
