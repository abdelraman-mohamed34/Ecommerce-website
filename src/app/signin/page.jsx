'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSelector } from 'react-redux'

export default function SignInPage() {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const { colors, color } = useSelector((state) => state.theme)
    const theme = colors[color]

    const validate = () => {
        const newErrors = {}
        if (!formData.email) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address'
        if (!formData.password) newErrors.password = 'Password is required'
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
        <div className={`lg:grid lg:grid-cols-[35rem_1fr] xl:grid-cols-[40rem_1fr] flex overflow-hidden ${theme.bg} justify-center`}>

            {/* Right Panel - Illustration */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="hidden lg:flex sticky top-0 h-screen items-center justify-center overflow-hidden"
            >
                <img
                    alt="Login Illustration"
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://plus.unsplash.com/premium_photo-1671829480432-9b0f10d869ef?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=1200"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-800/70 to-green-600/60 backdrop-blur-[2px]" />
                <h1 className="relative z-10 text-white text-5xl font-extrabold text-center leading-tight drop-shadow-xl">
                    Secure<br />Access<br />Starts Here.
                </h1>
            </motion.div>

            {/* Left Panel - Form */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className={`flex items-center justify-center sm:p-16 p-8 xl:shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full ${theme.panelBg}`}
            >
                <div className="w-full max-w-md">
                    <h1 className={`sm:text-5xl text-3xl font-extrabold mb-4 lg:text-start text-center bg-clip-text text-transparent bg-gradient-to-r from-green-900 to-green-600`}>
                        Welcome Back
                    </h1>
                    <p className={`sm:mb-10 mb-5 lg:text-start text-center text-base ${theme.text}`}>
                        Sign in to continue your journey.
                    </p>

                    <form onSubmit={handleSubmit} noValidate className="space-y-7">
                        <div>
                            <label className={`block text-sm font-semibold mb-2 ${theme.text}`}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className={`w-full border ${errors.email ? 'border-red-500' : theme.border} rounded-2xl p-3.5 ${theme.text} placeholder-gray-400 shadow-sm focus:ring-4 ${theme.focusRing} focus:border-2 ${theme.focusBorder} outline-none transition-all duration-200`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className={`block text-sm font-semibold mb-2 ${theme.text}`}>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className={`w-full border ${errors.password ? 'border-red-500' : theme.border} rounded-2xl p-3.5 ${theme.text} placeholder-gray-400 shadow-sm focus:ring-4 ${theme.focusRing} focus:border-2 ${theme.focusBorder} outline-none transition-all duration-200`}
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div className={`flex items-center justify-between text-sm ${theme.text}`}>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4 text-green-700 border-gray-300 rounded focus:ring-green-600" />
                                Remember me
                            </label>
                            <a href="#" className={`${theme.textHover} font-semibold`}>Forgot password?</a>
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: !loading ? 1.03 : 1 }}
                            whileTap={{ scale: 0.97 }}
                            disabled={loading}
                            className={`w-full py-3.5 rounded-full font-semibold text-white shadow-lg transition-all duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-green-800 to-green-600'} hover:shadow-xl hover:from-green-900`}
                        >

                            {loading ? 'Signing In...' : 'Sign In'}
                        </motion.button>


                    </form>

                    <p className="text-center text-sm text-gray-600 mt-8"> Don’t have an account?{' '} <Link href="/register" className="text-green-700 font-semibold hover:underline">Sign up</Link> </p>
                </div>
            </motion.div >
        </div >
    )
}
