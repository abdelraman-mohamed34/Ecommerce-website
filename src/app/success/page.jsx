'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SuccessPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-screen text-green-900"
        >
            <h1 className="text-4xl font-bold mb-4 flex justify-center items-center text-center">✅ Payment Successful!</h1>
            <p className="text-lg mb-6">Your order has been confirmed. Thank you!</p>
            <Link href="/" className="bg-green-800 text-white px-6 py-2 rounded-full hover:bg-green-700">
                Back to Home
            </Link>
        </motion.div>
    )
}
