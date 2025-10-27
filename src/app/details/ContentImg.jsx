'use client'
import { Skeleton } from '@mui/material'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function ContentImg() {
    const [product, setProduct] = useState(null)
    const [showedImg, setShowedImg] = useState(null)
    const [imgLoading, setImgLoading] = useState(true) // ✅ حالة تحميل الصورة

    useEffect(() => {
        const saved = localStorage.getItem('clickedProduct')
        if (saved) {
            const parsed = JSON.parse(saved)
            setProduct(parsed)
        }
    }, [])

    useEffect(() => {
        if (product?.images?.length) {
            setShowedImg(product.images[0])
        }
    }, [product])

    const { colors, color } = useSelector((state) => state.theme)
    const theme = colors[color]

    return (
        <div className="h-full">
            {!product ? (
                <Skeleton
                    variant="rectangular"
                    height="400px"
                    className="w-full sm:rounded-lg"
                    animation="wave"
                />
            ) : (
                <div>
                    <div className="relative w-full">
                        <motion.img
                            src={showedImg}
                            alt={product?.title || ''}
                            className={`w-full h-auto sm:rounded-lg object-cover ${theme.img_bg} ${imgLoading ? 'opacity-0' : 'opacity-100'}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            onLoad={() => setImgLoading(false)}
                            onClick={() => window.open(showedImg, '_blank')}
                        />
                    </div>

                    <div className="mt-3 flex gap-2 ml-3">
                        {product.images.map((img, i) => (
                            <motion.img
                                key={i}
                                src={img}
                                alt={`image-${i}`}
                                onClick={() => {
                                    setShowedImg(img)
                                    setImgLoading(true)
                                }}
                                className={`w-16 h-16 sm:rounded-lg rounded object-cover cursor-pointer ${theme.img_bg} ${showedImg === img ? 'border-2 border-green-500' : ''
                                    }`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ContentImg
