'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const validate = () => {
        const newErrors = {}
        if (!formData.name) newErrors.name = 'Full name is required'
        if (!formData.email) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address'
        if (!formData.password) newErrors.password = 'Password is required'
        if (formData.password && formData.password.length < 6)
            newErrors.password = 'Password must be at least 6 characters'
        if (formData.confirmPassword !== formData.password)
            newErrors.confirmPassword = 'Passwords do not match'
        return newErrors
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = validate()
        setErrors(validationErrors)
        if (Object.keys(validationErrors).length === 0) {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                router.push('/dashboard')
            }, 1500)
        }
    }

    return (
        <div className="min-h-screen lg:grid lg:grid-cols-[35rem_1fr] xl:grid-cols-[40rem_1fr] bg-gray-50 overflow-hidden">

            {/* Left Side - Image with Overlay */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex h-full justify-center items-center relative w-full overflow-hidden"
            >
                <img
                    alt="Register Illustration"
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=60&w=1200"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-800/70 to-green-600/60 backdrop-blur-[2px]" />
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className=" text-white text-5xl xl:text-6xl font-extrabold leading-tight px-8 drop-shadow-2xl"
                >
                    Create Your<br />Account Today.
                </motion.h1>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center justify-center sm:p-16 p-8 xl:bg-white xl:shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
            >
                <div className="w-full max-w-md">
                    <h1 className="sm:text-5xl text-3xl font-extrabold bg-gradient-to-r from-green-900 to-green-600 bg-clip-text text-transparent mb-5 text-center lg:text-left">
                        Join Us
                    </h1>
                    <p className="text-gray-500 sm:mb-10 mb-5 text-center lg:text-left">
                        Create your account to get started
                    </p>

                    <form onSubmit={handleSubmit} noValidate className="space-y-7">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-2xl p-3.5 text-gray-900 placeholder-gray-400 shadow-sm focus:ring-4 focus:ring-green-200 focus:border-green-700 outline-none transition-all duration-200`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-2xl p-3.5 text-gray-900 placeholder-gray-400 shadow-sm focus:ring-4 focus:ring-green-200 focus:border-green-700 outline-none transition-all duration-200`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-2xl p-3.5 text-gray-900 placeholder-gray-400 shadow-sm focus:ring-4 focus:ring-green-200 focus:border-green-700 outline-none transition-all duration-200`}
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className={`w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-2xl p-3.5 text-gray-900 placeholder-gray-400 shadow-sm focus:ring-4 focus:ring-green-200 focus:border-green-700 outline-none transition-all duration-200`}
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>

                        {/* Button */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: !loading ? 1.03 : 1 }}
                            whileTap={{ scale: 0.97 }}
                            disabled={loading}
                            className={`w-full py-3.5 rounded-full font-semibold text-white shadow-lg transition-all duration-300 
                                ${loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-green-800 to-green-600 hover:shadow-xl hover:from-green-900'}
                            `}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </motion.button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-8">
                        Already have an account?{' '}
                        <a href="/signin" className="text-green-700 font-semibold hover:underline">
                            Sign in
                        </a>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}