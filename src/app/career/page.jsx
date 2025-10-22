'use client'
import React from 'react'
import { motion } from 'framer-motion'

const jobs = [
    {
        title: 'Sales Executive',
        location: 'Cairo, Egypt',
        type: 'Full-time',
        description: 'Manage client relationships and boost product sales through strategic communication and outreach.',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=60',
    },
    {
        title: 'Digital Marketing Specialist',
        location: 'Remote',
        type: 'Full-time',
        description: 'Plan and execute online campaigns, manage social media ads, and optimize engagement for our store.',
        image: 'https://images.unsplash.com/photo-1630569470960-ec1e8c077d6b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRpZ2l0YWwlMjBtYXJrdGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
    },
    {
        title: 'Web Developer',
        location: 'Cairo, Egypt',
        type: 'Full-time',
        description: 'Build and maintain our e-commerce platform using React, Next.js, and Node.js technologies.',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=60',
    },
    {
        title: 'SEO Specialist',
        location: 'Remote',
        type: 'Contract',
        description: 'Improve our website ranking, optimize content, and ensure high visibility on search engines.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=60',
    },
    {
        title: 'Human Resources Manager',
        location: 'Cairo, Egypt',
        type: 'Full-time',
        description: 'Oversee recruitment, employee relations, and ensure a productive and positive work environment.',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=60',
    },
]

export default function Careers() {
    return (
        <section className="py-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
                    Join Our Growing Team
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jobs.map((job, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <img
                                src={job.image}
                                alt={job.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                                <p className="text-sm text-gray-500 mb-1">
                                    {job.location} • {job.type}
                                </p>
                                <p className="text-gray-600 text-sm mb-4">{job.description}</p>
                                <button className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition">
                                    Apply Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
