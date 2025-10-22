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
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { BsTelephone } from "react-icons/bs";
import ThemeSelect from './LangSelect';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { navigation } from './data.js'

export default function Nav() {

    const router = useRouter()
    const [open, setOpen] = useState(false)

    const handleNavigation = (type, prop) => {
        if (type === 'brand') {
            router.push(`/brand?brand=${prop}`)
        }
        else if (type === 'category') { router.push(`/category?name=${prop}`); }
    }

    return (
        <div className="bg-white sticky top-0 shadow-md z-10">
            {/* Mobile menu */}
            <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
                />
                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel
                        transition
                        className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
                    >
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

                        {/* Links  */}
                        <TabGroup className="mt-2">

                            {/* title | women or men in nav main*/}
                            <div className="border-b border-gray-200">
                                <TabList className="-mb-px flex space-x-8 px-4 overflow-x-auto">
                                    {navigation.categories.map((category) => (
                                        <Tab
                                            key={category.name}
                                            className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
                                        >
                                            {category.name}
                                        </Tab>
                                    ))}
                                </TabList>
                            </div>

                            <TabPanels as={Fragment}>
                                {navigation.categories.map((category) => (
                                    <TabPanel key={category.name} className={category?.featured ? "space-y-10 px-4 pt-10 pb-8" : "space-y-10 px-4 pt-10 pb-8"}>
                                        {category.featured && (
                                            <div className="grid grid-cols-2 gap-x-4">
                                                {category.featured.map((item) => (
                                                    <div key={item.name} className="group relative text-sm">
                                                        <img
                                                            alt={item.imageAlt}
                                                            src={item.imageSrc}
                                                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                                        />
                                                        <Link onClick={()=>setOpen(false)} href={item.href} className="mt-6 block font-medium text-gray-900" >
                                                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                                                            {item.name}
                                                        </Link>
                                                        <p aria-hidden="true" className="mt-1">
                                                            Shop now
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {category.sections.map((section) => (
                                            <div key={section.name}>
                                                <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                                    {section.name}
                                                </p>
                                                <ul
                                                    role="list"
                                                    aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                    className="mt-6 flex flex-col space-y-6"
                                                >
                                                    {/* for mobile */}
                                                    {section.items.map((item) => (
                                                        <li
                                                            key={item.name}
                                                            className="flow-root cursor-pointer"
                                                            onClick={() => {
                                                                if (section.name.toLowerCase() === 'brands') {
                                                                    handleNavigation('brand', item.prop)
                                                                }
                                                                else {
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
                        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                            <div className="flow-root">
                                <Link href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                    Sign in
                                </Link>
                            </div>
                            <div className="flow-root">
                                <Link href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                    Create account
                                </Link>
                            </div>
                        </div>

                        {/* mobile only */}
                        <div className="border-t border-gray-200 px-4 py-6">
                            <Link href="#" className="-m-2 flex items-center p-2">
                                <img
                                    alt=""
                                    src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                                    className="block h-auto w-5 shrink-0"
                                />
                                <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                                <span className="sr-only">, change currency</span>
                            </Link>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog >

            <header className="relative bg-white z-[1000]">

                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="sm:border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon aria-hidden="true" className="size-6" />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <Link href="/">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        alt=""
                                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                        className="h-8 w-auto"
                                    />
                                </Link>
                            </div>

                            {/* Flyout menus */}
                            <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="flex h-full space-x-8">
                                    {navigation.categories.map((category) => (
                                        <Popover key={category.name} className="flex">
                                            <div className="relative flex">
                                                <PopoverButton className="group relative flex items-center justify-center text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:text-indigo-600 focus:outline-none">
                                                    {category.name}
                                                    <span
                                                        aria-hidden="true"
                                                        className="absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out group-data-open:bg-indigo-600"
                                                    />
                                                </PopoverButton>
                                            </div>
                                            <PopoverPanel
                                                transition
                                                className="absolute inset-x-0 top-full z-20 w-full bg-white text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                                            >
                                                {({ close }) => (
                                                    <>
                                                        <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow-sm" />
                                                        <div className="relative bg-white">
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
                                                                                <Link href={item.href} className="mt-6 block font-medium text-gray-900">
                                                                                    <span aria-hidden="true" className="absolute inset-0 z-10" />
                                                                                    {item.name}
                                                                                </Link>
                                                                                <p aria-hidden="true" className="mt-1">
                                                                                    Shop now
                                                                                </p>
                                                                            </div>
                                                                        ))}
                                                                    </div>

                                                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                                        {category.sections.map((section) => (
                                                                            <div key={section.name}>
                                                                                <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                                                    {section.name}
                                                                                </p>
                                                                                <ul
                                                                                    role="list"
                                                                                    aria-labelledby={`${section.name}-heading`}
                                                                                    className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                >
                                                                                    {section.items.map((item) => (
                                                                                        <li
                                                                                            key={item.name}
                                                                                            className="flex cursor-pointer"
                                                                                            onClick={() => {
                                                                                                if (section.name.toLowerCase() === 'brands') handleNavigation('brand', item.prop);
                                                                                                else handleNavigation('category', item.prop);
                                                                                                close();
                                                                                            }}
                                                                                        >
                                                                                            <p className="hover:text-gray-800">
                                                                                                {item.name}
                                                                                            </p>
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
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            {page.name}
                                        </Link>
                                    ))}
                                </div>
                            </PopoverGroup>

                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                        Sign in
                                    </Link>
                                    <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                                    <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                        Create account
                                    </Link>
                                </div>

                                {/* Search */}
                                <div className="flex lg:ml-6">
                                    <Link href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Search</span>
                                        <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                                    </Link>
                                </div>

                                {/* Cart */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <Link href="#" className="group -m-2 flex items-center p-2">
                                        <ShoppingBagIcon
                                            aria-hidden="true"
                                            className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                        <span className="sr-only">items in cart, view bag</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav >

            </header >
        </div >
    )
}