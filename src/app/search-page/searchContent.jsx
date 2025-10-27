'use client'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProductsApiBySearch } from '../features/counter/searchSlice.js'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Rating } from '@mui/material'
import { CiClock1 } from 'react-icons/ci'
import { useSearchParams } from 'next/navigation.js'
import { useRouter } from 'next/navigation';

export default function SearchContent() {
    const searchParams = useSearchParams()
    const name = searchParams.get('name') || ''
    const dispatch = useDispatch()
    const router = useRouter()
    const { searchedProductsResult, loading, hasData, error } = useSelector(
        (state) => state.searchedProducts
    )
    const { colors, color } = useSelector((state) => state.theme)
    const theme = colors[color]

    useEffect(() => {
        if (!name.trim()) return
        dispatch(fetchProductsApiBySearch(name))
    }, [dispatch, name])

    const clickedProduct = (product) => {
        localStorage.setItem('clickedProduct', JSON.stringify(product))
    }

    if (loading && !hasData) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div className={`${theme.cardBg} rounded-md overflow-hidden animate-pulse`}>
                        <div className={`w-full aspect-square lg:h-80 rounded-md ${theme.skeletonBg}`}></div>

                        <div className="py-2 space-y-2">
                            <div className={`w-[80%] h-4 rounded ${theme.skeletonBg}`}></div>
                            <div className={`w-[60%] h-4 rounded ${theme.skeletonBg}`}></div>
                            <div className={`w-[40%] h-4  rounded ${theme.skeletonBg}`}></div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (error && !loading) {
        return (
            <div className="text-center text-red-600 py-10">
                Failed to load products 😢
            </div>
        )
    }

    if (hasData && searchedProductsResult.length === 0) {
        return (
            <div className="text-center text-gray-600 py-10">
                No products found for <span className="font-semibold">{name}</span>.
            </div>
        )
    }

    return (
        <section className="w-full py-10 px-5 lg:px-20">
            <h2 className={`text-2xl font-bold ${theme.secondText} mb-6`}>
                Search results for: <span className="text-green-700">{name}</span>
            </h2>

            <div className="flex flex-col w-full items-center">
                <div className="max-w-7xl w-full">
                    <div className="grid gap-x-6 gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {searchedProductsResult.map((product, index) => (
                            <Link href={'/details'} key={product.id}>
                                <motion.div
                                    className={`group relative ${theme.cardBg} rounded-md overflow-hidden hover:shadow-lg hover:scale-101 transition-all duration-300`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => clickedProduct(product)}
                                >
                                    <span className="relative">
                                        <img
                                            alt={product.title}
                                            src={product.images[0]}
                                            className={`aspect-square w-full rounded-md ${theme.img_bg} object-cover lg:aspect-auto lg:h-80 transition-transform duration-300 group-hover:scale-105`}
                                        />

                                        <div
                                            className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-l absolute bottom-2 right-0  ${product.availabilityStatus !== "In Stock" && "text-gray-500 bg-yellow-300 shadow"}`}
                                        >
                                            {product.availabilityStatus !== "In Stock" && (
                                                <>
                                                    <CiClock1 className="mr-1" /> Out of Stock
                                                </>
                                            )}
                                        </div>
                                    </span>
                                    <div className="mt-4 px-2 flex justify-between items-center">
                                        <div>
                                            <h3 className={`text-sm font-medium truncate ${theme.cardText}`}>
                                                {product.title}
                                            </h3>
                                            <p className={`text-xs ${theme.cardBrand}`}>{product.brand}</p>
                                            <p className={`text-sm font-semibold ${theme.cardPrice}`}>${product.price}</p>
                                        </div>
                                    </div>
                                    <div className="px-2 py-1">
                                        <Rating
                                            name="read-only"
                                            value={Math.floor(product.rating)}
                                            readOnly
                                            size="small"
                                            className={theme.ratingColor}
                                            sx={{
                                                '& .MuiRating-iconEmpty': { color: '#919191' },
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
