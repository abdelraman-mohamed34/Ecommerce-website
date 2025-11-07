'use client'
import React, { useState } from "react"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"

export default function Page() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })

    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({})

    // 🟢 Get theme from Redux
    const theme = useSelector((state) => state.theme)
    const currentColors = theme.colors[theme.color]

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setErrors(prev => ({ ...prev, [e.target.name]: "" }))
    }

    const validate = () => {
        const newErrors = {}
        if (!formData.name.trim()) newErrors.name = "Please enter your name"
        if (!formData.email.trim()) newErrors.email = "Please enter your email"
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address"
        if (!formData.subject.trim()) newErrors.subject = "Please enter a subject"
        if (!formData.message.trim()) newErrors.message = "Please write your message"
        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            setSubmitted(false)
            return
        }
        setSubmitted(true)
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setSubmitted(false), 4000)
    }

    // Motion variants
    const formVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    }

    const imageVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    }

    return (
        <div className={`w-full min-h-screen sm:grid sm:grid-cols-2 overflow-hidden transition-colors duration-500 ${currentColors.bg}`}>
            {/* Form Section */}
            <motion.div
                className="p-5 flex items-center justify-center"
                initial="hidden"
                animate="visible"
                variants={formVariants}
            >
                <div className={`max-w-3xl w-full p-6 rounded-lg shadow-xl transition-all duration-500 ${currentColors.cardBg} ${theme.color === 'dark' ? 'border border-green-900' : ''}`}>
                    <h1 className={`text-3xl font-bold mb-4 ${currentColors.text}`}>Contact Us</h1>
                    <p className={`${currentColors.cardBrand} mb-6`}>
                        Have questions, feedback, or need support? Fill out the form below and we will respond as soon as possible.
                    </p>

                    {submitted && (
                        <motion.div
                            className="mb-4 p-4 bg-green-100 text-green-700 border border-green-200 rounded"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            ✅ Your message has been sent successfully!
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${currentColors.text}`}>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full border rounded-md p-2 focus:ring-2 focus:ring-green-700 focus:outline-none ${theme.color === 'dark'
                                    ? 'border-green-800 text-white placeholder-gray-400'
                                    : 'border-gray-300 bg-white text-gray-900'
                                    }`}
                                placeholder="Your full name"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${currentColors.text}`}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full border rounded-md p-2 focus:ring-2 focus:ring-green-700 focus:outline-none ${theme.color === 'dark'
                                    ? 'border-green-800 text-white placeholder-gray-400'
                                    : 'border-gray-300 bg-white text-gray-900'
                                    }`}
                                placeholder="your@email.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Subject */}
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${currentColors.text}`}>Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className={`w-full border rounded-md p-2 focus:ring-2 focus:ring-green-700 focus:outline-none ${theme.color === 'dark'
                                    ? 'border-green-800 text-white placeholder-gray-400'
                                    : 'border-gray-300 bg-white text-gray-900'
                                    }`}
                                placeholder="Subject"
                            />
                            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                        </div>

                        {/* Message */}
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${currentColors.text}`}>Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                className={`w-full border rounded-md p-2 focus:ring-2 focus:ring-green-700 focus:outline-none ${theme.color === 'dark'
                                    ? 'border-green-800 text-white placeholder-gray-400'
                                    : 'border-gray-300 bg-white text-gray-900'
                                    }`}
                                placeholder="Write your message"
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-900 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-800 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </motion.div>

            {/* Image Section */}
            <motion.div
                className="hidden sm:flex w-full h-full relative"
                initial="hidden"
                animate="visible"
                variants={imageVariants}
            >
                <img
                    src="https://images.unsplash.com/photo-1636955735635-b4c0fd54f360?auto=format&fit=crop&q=80&w=1170"
                    alt="Contact Us Background"
                    className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black opacity-30"></div>
            </motion.div>
        </div>
    )
}
