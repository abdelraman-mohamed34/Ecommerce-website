'use client'
import { useState, useEffect } from 'react'
import { setColor } from '../features/counter/themeSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function ThemeSelect() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light'
    })

    const [lang, setLang] = useState('English')

    const themeSlice = useSelector((theme) => theme.theme.color)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setColor(theme))
    }, [theme])

    useEffect(() => {
        localStorage.setItem('theme', themeSlice)
        console.log('Theme in Redux:', themeSlice)
        document.body.classList.remove('light', 'dark')
        document.body.classList.add(themeSlice)
    }, [themeSlice])

    return (
        <div className="relative text-left flex items-center gap-3">
            {/* <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="block rounded-md
                  py-2 pr-3 text-sm font-medium"
            >
                <option value="english" className='text-black'>English</option>
                <option value="arabic" className='text-black'>Arabic</option>
            </select> */}

            <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="block rounded-md
                  py-2 pr-3 text-sm font-medium"
            >
                <option value="light" className='text-black'>Light</option>
                <option value="dark" className='text-black'>Dark</option>
            </select>
        </div>
    )
}
