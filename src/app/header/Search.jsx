'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function SearchButton() {
    const [showInput, setShowInput] = useState(true)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const containerRef = useRef(null)
    const router = useRouter()

    useEffect(() => {
        if (!query.trim()) {
            setResults([])
            return
        }

        const timeoutId = setTimeout(() => {
            fetchResults(query)
        }, 100)

        return () => clearTimeout(timeoutId)
    }, [query])

    const fetchResults = async (searchTerm) => {
        try {
            const res = await axios.get(`https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}`)
            setResults(res.data.products || [])
        } catch (err) {
            console.error(err)
            setResults([])
        }
    }

    const handleSearchClick = () => setShowInput(prev => !prev)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!query.trim()) return
        setQuery('')
        setResults([])
        router.push(`/search-page?name=${encodeURIComponent(query)}`)
    }

    const handleSelectResult = (product) => {
        localStorage.setItem('clickedProduct', JSON.stringify(product))
        setQuery('')
        setResults([])
        setShowInput(false)
        router.push('/details')
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowInput(false)
                setResults([])
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className='relative w-full lg:w-80 ml-5'>
            <div
                ref={containerRef}
                className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm overflow-hidden transition-all duration-300"
                onClick={() => setShowInput(true)}
            >
                <AnimatePresence>
                    <motion.form
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: '100%', opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleSubmit}
                        className="flex flex-col relative w-full"
                    >
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for products..."
                            className="px-4 py-2 text-sm text-gray-700 bg-transparent outline-none w-full"
                        />
                    </motion.form>
                </AnimatePresence>

                <button
                    onClick={handleSearchClick}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
                >
                    <MagnifyingGlassIcon aria-hidden="true" className="w-5 h-5" />
                </button>

                {/* Dropdown النتائج */}
                {results.length > 0 && (
                    <motion.ul
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute top-full left-0 right-0 bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-80 sm:max-h-64 overflow-y-auto z-50 w-full sm:w-auto"
                    >
                        {results.map(product => (
                            <li
                                key={product.id}
                                onClick={() => handleSelectResult(product)}
                                className="flex items-center px-4 py-3 sm:py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="w-12 h-12 sm:w-10 sm:h-10 object-cover rounded mr-3"
                                />
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-800 text-sm sm:text-base">{product.title}</span>
                                    <span className="text-gray-500 text-xs sm:text-sm">${product.price}</span>
                                </div>
                            </li>
                        ))}
                    </motion.ul>

                )}
            </div>


        </div>
    )
}
