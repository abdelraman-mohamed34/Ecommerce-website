'use client'

import { BsTelephone } from "react-icons/bs";
import ThemeSelect from './LangSelect';
import Nav from "./Nav";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Header() {

    const [open, setOpen] = useState(true)
    const { colors, color } = useSelector((state) => state.theme);

    return (
        <>
            {open && (
                <div className={`shadow-md z-10`}>
                    <header className={`relative z-[1000]`}>
                        <span className={`relative flex sm:py-1 py-[5px] items-center justify-center bg-green-900 px-4 text-xs font-medium text-white sm:px-6 lg:px-8`}>
                            <span className={`items-center gap-2 sm:flex hidden absolute sm:left-5 left-2`}>
                                <BsTelephone />
                                <p>+201021079171</p>
                            </span>
                            <span className={`flex items-center gap-3`}>
                                <p>Get 50% Off on Selected items</p>
                                <p>|</p>
                                <p>Shop Now</p>
                            </span>
                            {/* close btn */}
                            <button onClick={() => setOpen(false)} className="flex justify-center items-center absolute sm:right-5 right-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </span>
                    </header>
                </div>
            )}
            <Nav />
        </>
    )
}
