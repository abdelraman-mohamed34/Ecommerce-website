'use client'
import { Fragment, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { navigation } from './data.js'
import { CiLogin } from 'react-icons/ci';
import { RxAvatar } from "react-icons/rx";
import SearchButton from './Search.jsx';
import { useSelector } from 'react-redux';
import ThemeToggle from '../ThemeToggle.jsx';
import ThemeSelect from './LangSelect.jsx';

export default function Nav() {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const { colors, color } = useSelector((state) => state.theme)
    const theme = colors[color]

    const handleNavigation = (type, prop) => {
        if (type === 'brand') {
            router.push(`/brand?brand=${prop}`)
        } else if (type === 'category') {
            router.push(`/category?name=${prop}`);
        }
    }

    return (
        <div className={`${theme.bg} sticky top-0 shadow-md z-10`}>

            {/* Mobile menu */}
            <Dialog open={open} onClose={setOpen} className="relative z-[2000] xl:hidden">
                <DialogBackdrop className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0" />
                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel className={`relative flex w-full max-w-xs sm:max-w-lg lg:max-w-2xl transform flex-col overflow-y-auto pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full ${theme.bg}`}>
                        {/* mobile menu btn */}
                        <div className="flex px-4 pt-5 pb-2">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        {/* Links */}
                        <TabGroup className="mt-2">
                            <div className="border-b border-gray-200">
                                <TabList className="-mb-px flex space-x-8 px-4 overflow-x-auto">
                                    {navigation.categories.map((category) => (
                                        <Tab
                                            key={category.name}
                                            className={`flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap ${theme.text} data-selected:border-green-300 data-selected:text-green-300`}
                                        >
                                            {category.name}
                                        </Tab>
                                    ))}
                                </TabList>
                            </div>

                            <TabPanels as={Fragment}>
                                {navigation.categories.map((category) => (
                                    <TabPanel key={category.name} className="space-y-5 px-4 pt-3 pb-8">
                                        {category.featured && (
                                            <div className="grid grid-cols-2 gap-x-4">
                                                {category.featured.map((item) => (
                                                    <div key={item.name} className="group relative text-sm">
                                                        <img
                                                            alt={item.imageAlt}
                                                            src={item.imageSrc}
                                                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                                        />
                                                        <Link onClick={() => setOpen(false)} href={item.href} className={`mt-6 block font-medium ${theme.secondText}`}>
                                                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                                                            {item.name}
                                                        </Link>
                                                        <p aria-hidden="true" className={`mt-1 ${theme.text}`}>
                                                            Shop now
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {category.sections.map((section) => (
                                            <div key={section.name}>
                                                <p className={`font-medium ${theme.secondText}`}>{section.name}</p>
                                                <ul className="mt-6 flex flex-col space-y-3">
                                                    {section.items.map((item) => (
                                                        <li
                                                            key={item.name}
                                                            className="flow-root cursor-pointer"
                                                            onClick={() => {
                                                                if (section.name.toLowerCase() === 'brands') {
                                                                    handleNavigation('brand', item.prop)
                                                                } else {
                                                                    handleNavigation('category', item.prop);
                                                                    setOpen(false)
                                                                }
                                                            }}
                                                        >
                                                            <span className="-m-2 block p-2 text-gray-500 hover:text-gray-700">
                                                                {item.name}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </TabPanel>
                                ))}
                            </TabPanels>
                        </TabGroup>

                        {/* btns */}
                        <div className={`space-y-6 ${theme.topBorder} px-4 py-6`}>
                            <div className="flow-root">
                                <Link href="/signin" onClick={() => setOpen(false)} className={`flex items-center gap-1 -m-2 p-2 font-medium ${theme.secondText}`}>
                                    <CiLogin /> Sign in
                                </Link>
                            </div>
                            <div className="flow-root">
                                <Link href="/register" onClick={() => setOpen(false)} className={`flex items-center gap-1 -m-2 p-2 font-medium ${theme.secondText}`}>
                                    <RxAvatar /> Create account
                                </Link>
                            </div>
                        </div>

                        <div className={`w-full flex justify-start items-center ${theme.topBorder} pt-3 px-5`}>
                            <ThemeToggle />
                        </div>
                    </DialogPanel>
                </div>
            </Dialog >

            <header className={`relative ${theme.cardBg} z-[2000]`}>
                <nav aria-label="Top" className="mx-auto max-w-7xl xl:p-0 px-5">
                    <div>
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="relative rounded-md p-2 text-gray-400 2xl:hidden"
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon aria-hidden="true" className="size-6" />
                            </button>

                            {/* Logo */}
                            <div className="sm:ml-4 ml-1 flex lg:ml-0">
                                <Link href="/">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        alt=""
                                        src="/favicon.png"
                                        className="h-8 w-auto"
                                    />
                                </Link>
                            </div>

                            {/* Flyout menus */}
                            <PopoverGroup className="hidden lg:ml-8 xl:block lg:self-stretch">
                                <div className="flex h-full space-x-8">

                                    {/* nav  */}
                                    {navigation.categories.map((category) => (

                                        <Popover key={category.name} className="flex">

                                            {/* nav links for desktop*/}
                                            <div className="relative flex">
                                                {category.sections.length === 1 && category.sections[0].items.length === 1 ? (
                                                    <Link
                                                        href={category.sections[0].items[0].href || "#"}
                                                        className={`group relative flex items-center justify-center text-sm font-medium ${theme.text} ${theme.textHover} transition-colors duration-200 ease-out`}
                                                    >
                                                        {category.name}
                                                    </Link>) : (
                                                    <PopoverButton className={`group relative flex items-center justify-center text-sm font-medium ${theme.text} ${theme.textHover} transition-colors duration-200 ease-out data-open:text-green-600`}>
                                                        {category.name}
                                                        <span
                                                            aria-hidden="true"
                                                            className="absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out group-data-open:bg-green-600"
                                                        />
                                                    </PopoverButton>
                                                )}
                                            </div>
                                            <PopoverPanel className={`absolute inset-x-0 top-full z-20 w-full ${theme.bg} text-sm ${theme.text} transition data-closed:opacity-0`}>
                                                {({ close }) => (
                                                    <>
                                                        <div aria-hidden="true" className={`absolute inset-0 top-1/2 shadow-sm`} />
                                                        <div className={`relative z-[2000] ${theme.slider}`}>
                                                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                                                <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                        {category.featured.map((item) => (
                                                                            <div
                                                                                key={item.name}
                                                                                className="group relative text-base sm:text-sm"
                                                                                onClick={() => close()}
                                                                            >
                                                                                <img
                                                                                    alt={item.imageAlt}
                                                                                    src={item.imageSrc}
                                                                                    className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                                                                />
                                                                                <Link href={item.href} className={`mt-6 block font-medium ${theme.secondText}`}>
                                                                                    <span aria-hidden="true" className="absolute inset-0 z-10" />
                                                                                    {item.name}
                                                                                </Link>
                                                                                <p aria-hidden="true" className={`mt-1 ${theme.disText}`}>
                                                                                    Shop now
                                                                                </p>
                                                                            </div>
                                                                        ))}
                                                                    </div>

                                                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                                        {category.sections.map((section) => (
                                                                            <div key={section.name}>
                                                                                <p className={`${theme.text} font-medium`}>{section.name}</p>
                                                                                <ul className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                                                                    {section.items.map((item) => (
                                                                                        <li
                                                                                            key={item.name}
                                                                                            className={` ${theme.secondText} cursor-pointer`}
                                                                                            onClick={() => {
                                                                                                if (section.name.toLowerCase() === 'brands') handleNavigation('brand', item.prop);
                                                                                                else handleNavigation('category', item.prop);
                                                                                                close();
                                                                                            }}
                                                                                        >
                                                                                            <p className={`${theme.textHover} ${theme.disText}`}>{item.name}</p>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </PopoverPanel>
                                        </Popover>
                                    ))}

                                    {navigation.pages.map((page) => (
                                        <Link
                                            key={page.name}
                                            href={page.href}
                                            className={`flex items-center text-sm font-medium ${theme.secondText} ${theme.textHover}`}
                                        >
                                            {page.name}
                                        </Link>
                                    ))}
                                </div>
                            </PopoverGroup>

                            <div className="ml-auto flex items-center">
                                {/* Search btn */}
                                <div className="flex lg:mr-5">
                                    <SearchButton />
                                </div>

                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    <Link href="/signin" className={`text-sm font-medium ${theme.secondText} ${theme.textHover}`}>
                                        Sign in
                                    </Link>
                                    <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                                    <Link href="/register" className={`text-sm font-medium ${theme.secondText} ${theme.textHover}`}>
                                        Create account
                                    </Link>
                                </div>

                                {/* Cart */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <Link href="/signin" className="group -m-3 flex items-center p-2">
                                        <ShoppingBagIcon
                                            aria-hidden="true"
                                            className={`size-6 shrink-0 ${theme.secondText} group-hover:text-gray-500`}
                                        />
                                        <span className={`ml-2 text-sm font-medium ${theme.secondText} group-hover:text-gray-500`}>0</span>
                                        <span className="sr-only">items in cart, view bag</span>
                                    </Link>
                                </div>
                            </div>
                            <div className='px-3 hidden xl:flex'>
                                <ThemeSelect />
                            </div>
                        </div>
                    </div>
                </nav >
            </header >
        </div >
    )
}
