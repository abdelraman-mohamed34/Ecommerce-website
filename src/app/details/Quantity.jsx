'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../features/counter/counterSlice'

function Quantity() {
    const counter = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div className='px-4 py-2 w-35 rounded-3xl bg-gray-200/50 flex items-center justify-between'>
            <button className='text-center flex items-center text-2xl' onClick={() => dispatch(decrement())}>-</button>
            {counter}
            <button className='text-center flex items-center text-2xl' onClick={() => dispatch(increment())}>+</button>
        </div>
    )
}

export default Quantity
