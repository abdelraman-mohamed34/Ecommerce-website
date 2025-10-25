'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Skeleton } from '@mui/material'
import { useSelector } from 'react-redux'

export default function page() {
    const [integrations, setIntegrations] = useState(null)

    // Simulate API fetch
    useEffect(() => {
        setTimeout(() => {
            setIntegrations([
                { id: 1, name: 'Slack', description: 'Connect your workspace', img: 'https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png' },
                { id: 2, name: 'GitHub', description: 'Sync your repositories', img: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
                { id: 3, name: 'Google Drive', description: 'Access your files', img: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png' },
                { id: 4, name: 'Trello', description: 'Manage projects easily', img: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Trello-logo-blue.svg' },
            ])
        }, 1000)
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    }
    const { colors, color } = useSelector((state) => state.theme)
    const theme = colors[color]

    return (
        <div className="p-5 sm:p-10">
            <header className={`mb-10 text-center`}>
                <h1 className={`text-3xl sm:text-4xl font-bold ${theme.text}`}>Integrations</h1>
                <p className={`mt-2 text-gray-600 ${theme.disText}`}>Connect your favorite apps and services</p>
            </header>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {integrations
                    ? integrations.map((integration) => (
                        <motion.div
                            key={integration.id}
                            className={`${theme.cardBg} rounded-lg shadow-md p-5 flex flex-col items-center text-center cursor-pointer hover:shadow-xl transition`}
                            variants={cardVariants}
                        >
                            <img src={integration.img} alt={integration.name} className="w-16 h-16 mb-3 object-contain" />
                            <h3 className={`font-semibold ${theme.text}`}>{integration.name}</h3>
                            <p className={`${theme.disText} text-sm mt-1`}>{integration.description}</p>
                        </motion.div>
                    ))
                    : Array.from(new Array(5)).map((_, idx) => (
                        <motion.div
                            key={idx}
                            className={`${theme.cardBg} rounded-lg shadow-md p-5 flex flex-col items-center text-center`}
                            variants={cardVariants}
                        >
                            <Skeleton variant="circular" width={64} height={64} className="mb-3" />
                            <Skeleton variant="text" width="60%" height={24} className="mb-2" />
                            <Skeleton variant="text" width="80%" height={16} />
                        </motion.div>
                    ))
                }
            </motion.div>
        </div >
    )
}
