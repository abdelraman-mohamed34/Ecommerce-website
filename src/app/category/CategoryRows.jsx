'use client'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { Rating, Skeleton } from "@mui/material"
import { CiClock1 } from "react-icons/ci";
import { useSearchParams } from 'next/navigation'
import { fetchProductsApiByCategory } from '../features/counter/categoryApiSlice'

export default function CategoryRows() {
    const { productsCategory, loading, error, hasData } = useSelector((state) => state.productsCategory)
    const dispatch = useDispatch()
    const searchParams = useSearchParams()
    const category = searchParams.get('name')
    const { colors, color } = useSelector((state) => state.theme);
    const theme = colors[color];
    useEffect(() => {
        if (category) {
            dispatch(fetchProductsApiByCategory(category))
        }
    }, [category, dispatch])

    const clickedProduct = (product) => {
        localStorage.setItem('clickedProduct', JSON.stringify(product))
    }

    // Loading skeleton
    if (loading && !hasData) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={`${theme.cardBg} rounded-md overflow-hidden`}>
                        <Skeleton variant="rectangular" height={150} className="w-full lg:h-80 rounded-md" />
                        <div className="p-2">
                            <Skeleton width="80%" />
                            <Skeleton width="60%" />
                            <Skeleton width="40%" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    // Error after loading attempt
    if (error && !loading) {
        return (
            <div className="text-center text-red-600 py-10">
                Failed to load products 😢
            </div>
        )
    }

    // No products found after successful fetch
    if (hasData && productsCategory.length === 0) {
        return (
            <div className="text-center text-gray-600 py-10">
                No products found in this category.
            </div>
        )
    }

    // Display products
    return (
        <div className="flex flex-col w-full md:items-center lg:items-center items-center">
            <div className="max-w-2xl lg:max-w-7xl w-full">
                <div className="mt-6 grid gap-x-6 gap-y-10 grid-cols-2 lg:grid-cols-4 md:grid-cols-3 xl:gap-x-8">
                    {productsCategory.map((product, index) => (
                        <Link href={'/details'} key={product.id}>
                            <motion.div
                                className={`group relative ${theme.cardBg} rounded-md overflow-hidden hover:shadow-lg hover:scale-101 transition-all duration-300`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.2, type: 'spring', stiffness: 100 }}
                                onClick={() => clickedProduct(product)}
                            >
                                <span className="relative">
                                    <img
                                        alt={product.title}
                                        src={product.images[0]}
                                        className="aspect-square w-full rounded-md bg-gray-200 object-cover lg:aspect-auto lg:h-80 transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div
                                        className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-l absolute bottom-2 right-0  ${product.availabilityStatus !== "In Stock" && "text-gray-500 bg-yellow-300 shadow"
                                            }`}
                                    >
                                        {product.availabilityStatus !== "In Stock"
                                            && (
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
                                    />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
