'use client'

import { BsTelephone } from "react-icons/bs";
import ThemeSelect from './LangSelect';
import Nav from "./Nav";
import { useSelector } from "react-redux";

export default function Header() {

    const { colors, color } = useSelector((state) => state.theme);

    const bg = colors[color].bg

    console.log(bg)

    return (
        <>
            <div className={`bg-white shadow-md z-10`}>
                <header className={`relative bg-white z-[1000]`}>
                    <span className={`flex sm:py-1 py-[5px] items-center sm:justify-between justify-center bg-green-900 px-4 text-xs font-medium text-white sm:px-6 lg:px-8`}>
                        <span className={`items-center gap-2 sm:flex hidden`}>
                            <BsTelephone />
                            <p>+201021079171</p>
                        </span>
                        <span className={`flex items-center gap-3`}>
                            <p>Get 50% Off on Selected items</p>
                            <p>|</p>
                            <p>Shop Now</p>
                        </span>
                        <span className={`sm:flex hidden`}>
                            <ThemeSelect />
                        </span>
                    </span>
                </header>
            </div>
            <Nav />
        </>
    )
}
