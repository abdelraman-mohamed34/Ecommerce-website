'use client'
import React from 'react'
import { motion } from 'framer-motion'

const blogPosts = [
    {
        title: "Partnership with Alpha Textiles",
        description: "We have started importing new high-quality textile products in collaboration with Alpha Textiles to meet our customers' needs.",
        image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcGFueXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        date: "2020-8-10",
        category: "Textiles"
    },
    {
        title: "New Electronics Section with Beta Corp",
        description: "We opened a new electronics section in partnership with Beta Corp to offer the latest devices to our customers.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=60",
        date: "2022-2-16",
        category: "Electronics"
    },
    {
        title: "Summer Clothing Sale",
        description: "Exclusive discounts on our summer clothing collection for all new and existing customers.",
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=60",
        date: "2019-10-18",
        category: "Clothing"
    }
]

export default function Blog() {
    return (
        <section className="py-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
                    Latest Store and Partner Updates
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <p className="text-sm text-gray-500">{post.date} • {post.category}</p>
                                <h3 className="mt-2 text-lg font-semibold text-gray-900">{post.title}</h3>
                                <p className="mt-2 text-gray-700 text-sm">{post.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
