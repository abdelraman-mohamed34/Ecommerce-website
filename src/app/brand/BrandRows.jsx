'use client'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { Rating, Skeleton } from "@mui/material"
import { CiClock1 } from "react-icons/ci";
import { useSearchParams } from 'next/navigation'
import { fetchBrandProducts } from '../features/counter/brandSlice'

export default function BrandRows() {

    const { brands, loading, error } = useSelector((state) => state.brandsCategory)

    const dispatch = useDispatch()
    const searchParams = useSearchParams()
    const brand = searchParams.get('brand')

    useEffect(() => {
        if (brand) {
            dispatch(fetchBrandProducts(brand))
        }
    }, [brand, dispatch])

    const clickedProduct = (product) => {
        localStorage.setItem('clickedProduct', JSON.stringify(product))
    }

    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-md overflow-hidden  transition-all duration-300"
                    >
                        {/* img */}
                        <Skeleton
                            variant="rectangular"
                            height={220}
                            animation="wave"
                            className="w-full"
                        />

                        {/* details */}
                        <div className="px-3 py-3 space-y-2">
                            <Skeleton variant="text" width="80%" height={20} animation="wave" />
                            <Skeleton variant="text" width="60%" height={18} animation="wave" />
                            <Skeleton variant="text" width="40%" height={18} animation="wave" />
                        </div>

                        {/* rating */}
                        <div className="px-3 pb-3">
                            <Skeleton variant="rounded" width={80} height={20} animation="wave" />
                        </div>
                    </div>
                ))}

            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center text-red-600 py-10">
                Failed to load products 😢
            </div>
        )
    }

    if (!brands || brands.length === 0) {
        return (
            <div className="text-center text-gray-600 py-10">
                No products found in this category.
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full md:items-center lg:items-center items-center">
            <div className="max-w-2xl lg:max-w-7xl w-full">
                <div className="mt-6 grid gap-x-6 gap-y-10 grid-cols-2 lg:grid-cols-4 md:grid-cols-3 xl:gap-x-8">
                    {brands.map((product, index) => (
                        <Link href={'/details'} key={product.id}>
                            <motion.div
                                className="group relative bg-white rounded-md overflow-hidden hover:shadow-lg hover:scale-101 transition-all duration-300"
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
                                        <h3 className="text-sm text-gray-700 font-medium truncate">
                                            {product.title}
                                        </h3>
                                        <p className="text-xs text-gray-500">{product.brand}</p>
                                        <p className="text-sm font-semibold text-gray-900">${product.price}</p>
                                    </div>
                                </div>
                                <div className="px-2 py-1">
                                    <Rating
                                        name="read-only"
                                        value={Math.floor(product.rating)}
                                        readOnly
                                        size="small"
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
