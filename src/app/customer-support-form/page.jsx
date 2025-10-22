'use client'
import React, { useState } from "react"
import { motion } from "framer-motion"

export default function CustomerSupportForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({})

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

        console.log(formData)
        setSubmitted(true)
        setFormData({ name: "", email: "", subject: "", message: "" })
    }

    const formVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    }

    const imageVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    }

    return (
        <section className="min-h-screen bg-gray-50 py-16 flex items-center justify-center">
            <div className="max-w-7xl w-full grid sm:grid-cols-2 gap-10 px-6 lg:px-12">
                {/* Form Section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={formVariants}
                    className="bg-white rounded-2xl shadow-md p-8 flex flex-col justify-center"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Support</h2>
                    <p className="text-gray-600 mb-6">
                        We’re here to help! Please fill out the form below to share your complaint or issue.
                        Our support team will respond as soon as possible.
                    </p>

                    {submitted && (
                        <motion.div
                            className="mb-4 p-4 bg-green-100 text-green-700 border border-green-200 rounded-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            ✅ Your message has been sent successfully. We'll get back to you shortly!
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:outline-none"
                                placeholder="Your name"
                            />
                            {errors.name && (
                                <motion.p
                                    className="text-red-500 text-sm mt-1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {errors.name}
                                </motion.p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:outline-none"
                                placeholder="you@example.com"
                            />
                            {errors.email && (
                                <motion.p
                                    className="text-red-500 text-sm mt-1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {errors.email}
                                </motion.p>
                            )}
                        </div>

                        {/* Subject */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:outline-none"
                                placeholder="Issue subject"
                            />
                            {errors.subject && (
                                <motion.p
                                    className="text-red-500 text-sm mt-1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {errors.subject}
                                </motion.p>
                            )}
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-700 focus:outline-none"
                                placeholder="Describe your issue..."
                            ></textarea>
                            {errors.message && (
                                <motion.p
                                    className="text-red-500 text-sm mt-1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {errors.message}
                                </motion.p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-800 text-white font-semibold py-2.5 rounded-lg hover:bg-green-900 transition duration-200"
                        >
                            Submit
                        </button>
                    </form>
                </motion.div>

                {/* Image Section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={imageVariants}
                    className="hidden sm:flex items-center justify-center relative"
                >
                    <img
                        src="https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1000&q=80"
                        alt="Support"
                        className="w-full h-full object-cover rounded-2xl shadow-md"
                    />
                    <div className="absolute inset-0 bg-green-900/20 rounded-2xl"></div>
                </motion.div>
            </div>
        </section>
    )
}
