import { Rating } from '@mui/material'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { CiClock1 } from 'react-icons/ci'
import { useSelector } from 'react-redux'

function ShopSimilar() {
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const saved = localStorage.getItem('clickedProduct')
        setProduct(JSON.parse(saved))
    }, [])
    const products = useSelector((state) => state.productStore.products)
    const { colors, color } = useSelector((state) => state.theme)
    const theme = colors[color]

    const filteredProducts = products?.filter(
        (p) => p.category === product?.category && p.id !== product?.id
    )

    const clickedProduct = (p) => {
        localStorage.setItem('clickedProduct', JSON.stringify(p))
        window.scrollTo({
            top: 0,
        })
        window.location.reload()
    }

    return (
        <>
            {
                filteredProducts.length !== 0 && (
                    <section className={`py-5 ${theme.topBorder} mt-5 sm:px-0 px-5`}>
                        <h1 className="text-xl font-semibold">Shop Similar</h1>

                        <div className="flex flex-col w-full items-center">
                            <div className="max-w-7xl w-full">
                                <div className="mt-6 grid gap-x-6 gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                                    {filteredProducts.slice(0, 10).map((p, index) => (
                                        <div
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
                                                className={`aspect-square w-full ${theme.img_bg} object-cover lg:aspect-auto lg:h-80 transition-transform duration-300 group-hover:scale-105`}
                                            />

                                            <div className="mt-4 px-2 flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-sm font-medium truncate">{p.title}</h3>
                                                    <p className="text-xs opacity-70">{p.brand}</p>
                                                    <p className="text-sm font-semibold">${p.price}</p>
                                                </div>
                                            </div>

                                            <div className="px-2 py-1">
                                                <Rating name="read-only" value={Math.floor(p.rating)} readOnly size="small" sx={{
                                                    '& .MuiRating-iconEmpty': { color: '#919191' },
                                                }} />
                                            </div>

                                            {p.availabilityStatus !== "In Stock" && (
                                                <div className="inline-flex items-center px-3 py-1 text-sm font-semibold rounded-l absolute bottom-27 right-0 text-gray-500 bg-yellow-300 shadow">
                                                    <CiClock1 className="mr-1" /> Out of Stock
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
        </>
    )
}

export default ShopSimilar
