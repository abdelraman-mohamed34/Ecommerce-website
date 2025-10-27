'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

export default function RegisterPage() {
    const { colors, color } = useSelector((state) => state.theme)
    const theme = colors[color]

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
        <div className={`lg:grid lg:grid-cols-[35rem_1fr] xl:grid-cols-[40rem_1fr] overflow-hidden ${theme.bg}`}>

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
                className={`flex items-center justify-center sm:p-16 p-8 xl:shadow-[0_8px_40px_rgba(0,0,0,0.08)] ${theme.bg}`}
            >
                <div className="w-full max-w-md">
                    <h1 className={`sm:text-5xl text-3xl font-extrabold mb-5 text-center lg:text-left ${theme.accent} bg-clip-text bg-gradient-to-r from-green-900 to-green-600 text-transparent`}>
                        Join Us
                    </h1>
                    <p className={`sm:mb-10 mb-5 text-center lg:text-left ${theme.text}`}>
                        Create your account to get started
                    </p>

                    <form onSubmit={handleSubmit} noValidate className="space-y-7">
                        {['name', 'email', 'password', 'confirmPassword'].map((field, i) => (
                            <div key={i}>
                                <label className={`block text-sm font-semibold mb-2 ${theme.text}`}>
                                    {field === 'name' ? 'Full Name' :
                                        field === 'email' ? 'Email' :
                                            field === 'password' ? 'Password' : 'Confirm Password'}
                                </label>
                                <input
                                    type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    placeholder={field === 'name' ? 'John Doe' :
                                        field === 'email' ? 'you@example.com' :
                                            '••••••••'}
                                    className={`w-full border ${errors[field] ? 'border-red-500' : 'border-gray-200'} rounded-2xl p-3.5 text-gray-900 placeholder-gray-400 shadow-sm focus:ring-4 focus:ring-green-200 focus:border-green-700 outline-none transition-all duration-200 ${theme.bg}`}
                                />
                                {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                            </div>
                        ))}

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

                    <p className={`text-center text-sm mt-8 ${theme.text}`}>
                        Already have an account?{' '}
                        <a href="/signin" className={`font-semibold hover:underline ${theme.accent}`}>
                            Sign in
                        </a>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
