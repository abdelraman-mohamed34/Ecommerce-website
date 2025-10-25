'use client'
import { useState, useEffect } from 'react'
import { setColor } from './features/counter/themeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { FaSun, FaMoon } from 'react-icons/fa'

export default function ThemeToggle() {
    const dispatch = useDispatch()
    const themeSlice = useSelector((state) => state.theme.color)

    const [theme, setTheme] = useState('light')
    const [mounted, setMounted] = useState(false)

    // Load theme from localStorage after mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') || 'light'
            setTheme(savedTheme)
        }
        setMounted(true)
    }, [])

    // Update Redux when theme changes
    useEffect(() => {
        if (mounted) dispatch(setColor(theme))
    }, [theme, dispatch, mounted])

    // Apply theme to body and save to localStorage
    useEffect(() => {
        if (mounted) {
            localStorage.setItem('theme', theme)
            document.body.classList.remove('light', 'dark')
            document.body.classList.add(theme)
        }
    }, [theme, mounted])

    if (!mounted) return null // Prevent render on SSR

    const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))

    return (
        <div className="flex items-center justify-center">
            <button
                onClick={toggleTheme}
                className="relative w-16 h-8 flex items-center rounded-full p-1 transition-colors duration-300"
                style={{ backgroundColor: theme === 'light' ? '#E5E7EB' : '#1F2937' }}
            >
                <span
                    className={`absolute left-1 w-6 h-6 rounded-full bg-white flex items-center justify-center text-yellow-400 transform transition-transform duration-300 ${theme === 'dark' ? 'translate-x-8' : ''}`}
                >
                    {theme === 'light' ? <FaSun /> : <FaMoon className="text-gray-700" />}
                </span>
            </button>
        </div>
    )
}
