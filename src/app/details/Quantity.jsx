'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../features/counter/counterSlice'

function Quantity() {
    const [product, setProduct] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const saved = localStorage.getItem('clickedProduct')
        if (saved) setProduct(JSON.parse(saved))
    }, [])

    const quantity = useSelector(state => {
        if (!product) return 1
        return state.counter.quantities[product.id] || 1
    })
    const stock = product?.stock || 1

    if (!product) return

    return (
        <div className='px-4 py-2 w-35 rounded-3xl bg-gray-200/50 flex items-center justify-between'>
            <button
                className='text-center flex items-center text-2xl'
                onClick={() => dispatch(decrement(product.id))}
            >
                -
            </button>
            {quantity}
            <button
                className='text-center flex items-center text-2xl'
                onClick={() => dispatch(increment({ productId: product.id, stock }))}
            >
                +
            </button>
        </div>
    )
}

export default Quantity
