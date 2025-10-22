'use client'
import React from 'react'
import { AiOutlineCloudUpload, AiOutlineLock, AiOutlineTeam } from 'react-icons/ai'
import { MdSpeed } from 'react-icons/md'

const features = [
    {
        icon: <AiOutlineCloudUpload className="text-green-700 w-10 h-10" />,
        title: 'Cloud Sync',
        description: 'Automatically sync your files to the cloud for secure storage and access anywhere.',
    },
    {
        icon: <AiOutlineLock className="text-green-700 w-10 h-10" />,
        title: 'Secure',
        description: 'Your data is encrypted and protected with industry-standard security protocols.',
    },
    {
        icon: <MdSpeed className="text-green-700 w-10 h-10" />,
        title: 'Fast Performance',
        description: 'Experience blazing fast upload and download speeds for all your files.',
    },
    {
        icon: <AiOutlineTeam className="text-green-700 w-10 h-10" />,
        title: 'Collaboration',
        description: 'Share files with your team and collaborate in real-time efficiently.',
    },
]

export default function Features() {
    return (
        <div className="py-16 bg-gray-50">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
