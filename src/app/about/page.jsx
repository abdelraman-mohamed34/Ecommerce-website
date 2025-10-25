'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

export default function About() {
    const theme = useSelector((state) => state.theme)
    const currentColors = theme.colors[theme.color]

    return (
        <section className={`${currentColors.bg} py-16 min-h-screen ${currentColors.text} transition-colors duration-500`}>
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className={`text-4xl font-extrabold mb-4 ${currentColors.text}`}>About Our Store</h1>
                    <p className={`text-lg max-w-2xl mx-auto ${currentColors.cardBrand}`}>
                        We’re more than just a store — we’re a growing family of creators, innovators,
                        and dreamers passionate about delivering quality products and experiences.
                    </p>
                </motion.div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=900&q=60"
                            alt="Our Team"
                            className="rounded-xl shadow-lg w-full h-[350px] object-cover"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className={`text-2xl font-bold mb-3 ${currentColors.text}`}>Our Mission</h2>
                        <p className={`${currentColors.cardBrand} mb-4`}>
                            Our mission is to connect people with premium products at fair prices,
                            while ensuring sustainability and innovation in everything we do.
                        </p>

                        <h2 className={`text-2xl font-bold mb-3 ${currentColors.text}`}>Our Vision</h2>
                        <p className={currentColors.cardBrand}>
                            We aim to be one of the most trusted online marketplaces in the region — 
                            a place where quality, creativity, and technology come together for a better shopping experience.
                        </p>
                    </motion.div>
                </div>

                {/* Values Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="mt-20"
                >
                    <h2 className={`text-3xl font-bold text-center mb-10 ${currentColors.text}`}>
                        Our Core Values
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: 'Quality',
                                desc: 'We ensure every product meets the highest standards of craftsmanship and reliability.',
                                img: 'https://images.unsplash.com/photo-1573496529574-be85d6a60704?auto=format&fit=crop&w=600&q=60',
                            },
                            {
                                title: 'Innovation',
                                desc: 'We embrace technology and creativity to deliver modern shopping experiences.',
                                img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=60',
                            },
                            {
                                title: 'Customer Focus',
                                desc: 'We listen, understand, and deliver exactly what our customers need — every time.',
                                img: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=600&q=60',
                            },
                            {
                                title: 'Sustainability',
                                desc: 'We care for the environment and promote responsible production and consumption.',
                                img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=60',
                            },
                        ].map((v, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className={`${currentColors.cardBg} p-6 rounded-xl shadow hover:shadow-lg transition text-center`}
                            >
                                <img
                                    src={v.img}
                                    alt={v.title}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <h3 className={`text-lg font-semibold mb-2 ${currentColors.cardText}`}>{v.title}</h3>
                                <p className={`${currentColors.cardBrand} text-sm`}>{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
