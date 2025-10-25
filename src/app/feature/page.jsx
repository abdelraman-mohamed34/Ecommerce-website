'use client'
import React from 'react'
import { AiOutlineCloudUpload, AiOutlineLock, AiOutlineTeam } from 'react-icons/ai'
import { MdSpeed } from 'react-icons/md'
import { useSelector } from 'react-redux'

const features = [
    {
        icon: AiOutlineCloudUpload,
        title: 'Cloud Sync',
        description: 'Automatically sync your files to the cloud for secure storage and access anywhere.',
    },
    {
        icon: AiOutlineLock,
        title: 'Secure',
        description: 'Your data is encrypted and protected with industry-standard security protocols.',
    },
    {
        icon: MdSpeed,
        title: 'Fast Performance',
        description: 'Experience blazing fast upload and download speeds for all your files.',
    },
    {
        icon: AiOutlineTeam,
        title: 'Collaboration',
        description: 'Share files with your team and collaborate in real-time efficiently.',
    },
]

export default function Features() {
    const theme = useSelector(state => state.theme)
    const colors = theme.colors[theme.color]

    return (
        <div className={`${colors.bg} py-16 transition-colors duration-500`}>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className={`text-3xl font-extrabold text-center mb-12 ${colors.text}`}>
                    Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={index}
                                className={`${colors.cardBg} p-6 rounded-xl shadow hover:shadow-lg transition`}
                            >
                                <div className="mb-4">
                                    <Icon className="w-10 h-10 text-green-700" />
                                </div>
                                <h3 className={`text-xl font-semibold mb-2 ${colors.text}`}>{feature.title}</h3>
                                <p className={`text-sm ${colors.cardBrand}`}>{feature.description}</p>
                            </div>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}
