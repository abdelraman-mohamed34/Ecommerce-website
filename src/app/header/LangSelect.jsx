'use client'
import { useState, useEffect } from 'react'
import { setColor } from '../features/counter/themeSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function ThemeSelect() {
    const dispatch = useDispatch()

    const [theme, setTheme] = useState('light')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') || 'light'
            setTheme(savedTheme)
        }
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted) {
            dispatch(setColor(theme))
        }
    }, [theme, dispatch, mounted])

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('theme', theme)
            document.body.classList.remove('light', 'dark')
            document.body.classList.add(theme)
        }
    }, [theme, mounted])

    if (!mounted) return null

    return (
        <div className="relative text-left flex items-center gap-3 ml-2">
            <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className={`block rounded-md py-2 pr-3 text-sm font-medium ${theme === 'light' ? 'text-black' : 'text-gray-200'}`}
            >
                <option value="light" className='text-black'>Light</option>
                <option value="dark" className='text-black'>Dark</option>
            </select>
        </div >
    )
}
