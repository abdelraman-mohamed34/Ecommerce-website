'use client'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProductsApiBySearch } from '../features/counter/searchSlice.js'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Skeleton, Rating } from '@mui/material'
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
                    <div key={i} className="bg-white rounded-md overflow-hidden shadow-sm">
                        <Skeleton variant="rectangular" height={220} animation="wave" className="w-full" />
                        <div className="px-3 py-3 space-y-2">
                            <Skeleton variant="text" width="80%" height={20} animation="wave" />
                            <Skeleton variant="text" width="60%" height={18} animation="wave" />
                            <Skeleton variant="text" width="40%" height={18} animation="wave" />
                        </div>
                        <div className="px-3 pb-3">
                            <Skeleton variant="rounded" width={80} height={20} animation="wave" />
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Search results for: <span className="text-green-700">{name}</span>
            </h2>

            <div className="flex flex-col w-full items-center">
                <div className="max-w-7xl w-full">
                    <div className="grid gap-x-6 gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {searchedProductsResult.map((product, index) => (
                            <Link href={`/details`} key={product.id}>
                                <motion.div
                                    className="group relative bg-white rounded-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => clickedProduct(product)}
                                >
                                    <img
                                        alt={product.title}
                                        src={product.thumbnail}
                                        className="aspect-square w-full rounded-md bg-gray-200 object-cover lg:h-80 transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {product.availabilityStatus !== 'In Stock' && (
                                        <div className="absolute bottom-2 right-0 inline-flex items-center px-3 py-1 text-sm font-semibold rounded-l bg-yellow-300 text-gray-500 shadow">
                                            <CiClock1 className="mr-1" /> Out of Stock
                                        </div>
                                    )}
                                    <div className="mt-4 px-2 flex justify-between items-center">
                                        <div>
                                            <h3 className="text-sm text-gray-700 font-medium truncate">{product.title}</h3>
                                            <p className="text-xs text-gray-500">{product.brand}</p>
                                            <p className="text-sm font-semibold text-gray-900">${product.price}</p>
                                        </div>
                                    </div>
                                    <div className="px-2 py-1">
                                        <Rating name="read-only" value={Math.floor(product.rating)} readOnly size="small" />
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
