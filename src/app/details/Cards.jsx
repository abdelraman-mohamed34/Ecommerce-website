'use client'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Rating, Skeleton } from "@mui/material"
import { fetchProductsApi, setTag } from "../features/counter/productsSlice"
import Link from "next/link"
import { FaCheckCircle } from "react-icons/fa";
import { CiClock1 } from "react-icons/ci";

export default function Cards(props) {
    const products = useSelector((state) => state.productStore.products)
    const tag = useSelector((tags) => tags.productStore.tag)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProductsApi())
    }, [dispatch])

    const clickedProduct = (product) => {
        localStorage.setItem('clickedProduct', JSON.stringify(product))
    }
    const [slice, setSlice] = useState(8)

    const tags = ["all", "beauty", "electronics", "fashion", "sports"];
    const filteredProducts = products.filter(product => product.category !== 'beauty')

    return (

        <section className="w-full py-10 px-5 lg:px-20 md:px-15 sm:p-10" ref={props.scrolled}>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>

            <div className="my-5 hidden">
                <select
                    className="border px-3 py-2 rounded-md"
                    value={tag}
                    onChange={(e) => { dispatch(setTag(e.target.value)); setSlice(8); }}
                >
                    {tags.map(tag => (
                        <option key={tag} value={tag}>
                            {tag.charAt(0).toUpperCase() + tag.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col w-full md:items-center lg:items-center items-center">
                <div className="max-w-2xl lg:max-w-7xl w-full">
                    <div className="mt-6 grid gap-x-6 gap-y-10 grid-cols-2 lg:grid-cols-4 md:grid-cols-3 xl:gap-x-8">
                        {!products || products.length === 0 ? (
                            Array.from(new Array(8)).map((_, index) => (
                                <div key={index} className="bg-white rounded-md overflow-hidden">
                                    <Skeleton variant="rectangular" height={300} className="w-full lg:h-80 rounded-md" />
                                    <div className="p-2">
                                        <Skeleton width="80%" />
                                        <Skeleton width="60%" />
                                        <Skeleton width="40%" />
                                    </div>
                                </div>
                            ))
                        ) :
                            filteredProducts.slice(0, slice).map((product, index) => (
                                <Link href={'/details'} key={product.id}>
                                    <motion.div
                                        className="group relative bg-white rounded-md overflow-hidden  hover:shadow-lg hover:scale-101 transition-all duration-300"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
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
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* زر Load More */}
            {
                slice < filteredProducts.length && (
                    <span className="w-full flex justify-center mt-10">
                        <button
                            onClick={() => setSlice(prev => prev + 8)}
                            className="bg-green-900 text-white px-6 py-2 rounded-full hover:bg-green-800 transition-all duration-300 cursor-pointer"
                        >
                            Load More
                        </button>
                    </span>
                )
            }
        </section >
    )
}
