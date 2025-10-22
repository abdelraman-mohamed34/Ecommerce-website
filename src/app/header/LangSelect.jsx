'use client'
import { useState, useEffect } from 'react'

export default function ThemeSelect() {
    const [theme, setTheme] = useState('light')
    const [lang, setLang] = useState('English')

    // useEffect(() => {
    //     if (theme === 'dark') {
    //         document.documentElement.classList.add('dark')
    //     } else {
    //         document.documentElement.classList.remove('dark')
    //     }
    // }, [theme])

    return (
        <div className="relative text-left flex items-center gap-3">
            <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="block rounded-md
                  py-2 pr-3 text-sm font-medium"
            >
                <option value="english" className='text-black'>English</option>
                <option value="arabic" className='text-black'>Arabic</option>
            </select>
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
