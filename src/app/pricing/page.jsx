'use client'

import { motion } from 'framer-motion'
import { CheckIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

const tiers = [
    {
        name: 'Hobby',
        id: 'tier-hobby',
        href: '/payment',
        priceMonthly: '$29',
        description: "The perfect plan if you're just getting started with our product.",
        features: ['25 products', 'Up to 10,000 subscribers', 'Advanced analytics', '24-hour support response time'],
        featured: false,
    },
    {
        name: 'Enterprise',
        id: 'tier-enterprise',
        href: '/payment',
        priceMonthly: '$99',
        description: 'Dedicated support and infrastructure for your company.',
        features: [
            'Unlimited products',
            'Unlimited subscribers',
            'Advanced analytics',
            'Dedicated support representative',
            'Marketing automations',
            'Custom integrations',
        ],
        featured: true,
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function PricingPage() {
    return (
        <div className='relative w-full h-full flex'>
            {/* <img className='w-full h-full object-cover fixed left-0 top-0 z-1' src="https://media.istockphoto.com/id/2172774772/photo/3d-rendering-of-purple-and-blue-abstract-fluid-background-scene-for-advertising-technology.webp?a=1&b=1&s=612x612&w=0&k=20&c=S7D6_4XRnXdtZ3LD4pCdRYLGgabgRs3EZzWKrVFFOh8=" alt="" /> */}
            <div className="relative isolate bg-transparent px-6 py-24 sm:py-32 lg:px-8 overflow-hidden w-full z-5">
                {/* Animated Background */}
                <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
                    className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-pink-400 to-green-500 opacity-20 rounded-full blur-3xl"
                />

                <div className="mx-auto max-w-4xl text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-base font-semibold text-green-600"
                    >
                        Pricing
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                        className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl"
                    >
                        Choose the right plan for you
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.4 }}
                        className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl"
                    >
                        Affordable plans packed with the best features for engaging your audience, creating customer loyalty, and driving sales.
                    </motion.p>
                </div>

                {/* Cards */}
                <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-6 sm:mt-20 lg:max-w-4xl lg:grid-cols-2">
                    {tiers.map((tier) => (
                        <motion.div
                            key={tier.id}
                            whileHover={{ y: -10, scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className={classNames(
                                tier.featured ? 'bg-gray-100 shadow-2xl border-2 border-green-700' : 'bg-white',
                                'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10'
                            )}
                        >
                            <h3 className={classNames(tier.featured ? 'text-green-800' : 'text-green-900', 'text-base font-semibold')}>
                                {tier.name}
                            </h3>
                            <p className="mt-4 flex items-baseline gap-x-2">
                                <span className={classNames(tier.featured ? 'text-gray-900' : 'text-gray-900', 'text-5xl font-semibold')}>
                                    {tier.priceMonthly}
                                </span>
                                <span className={classNames(tier.featured ? 'text-gray-500' : 'text-gray-500', 'text-base')}>/month</span>
                            </p>
                            <p className={classNames(tier.featured ? 'text-gray-700' : 'text-gray-600', 'mt-6 text-base')}>
                                {tier.description}
                            </p>
                            <ul className={classNames(tier.featured ? 'text-gray-700' : 'text-gray-600', 'mt-8 space-y-3 text-sm')}>
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <CheckIcon className={classNames(tier.featured ? 'text-green-800' : 'text-green-900', 'h-6 w-5 flex-none')} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={tier.href}
                                className={classNames(
                                    tier.featured
                                        ? 'mt-8 block w-full rounded-md bg-green-900 px-3.5 py-2.5 text-center text-white font-semibold shadow hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500'
                                        : 'mt-8 block w-full rounded-md border border-indigo-200 px-3.5 py-2.5 text-center text-green-700 font-semibold hover:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                                )}
                            >
                                Get started today
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
