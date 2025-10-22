'use client'
import React from 'react'

export default function PrivacyPolicy() {
    return (
        <>
            {/* SEO Meta Tags */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                {/* Main Heading */}
                <header>
                    <h1 className="text-3xl font-bold mb-6 text-gray-900">Privacy & Policy</h1>
                    <p className="text-gray-700 mb-4">
                        We at <strong>Abdelrahman Mohamed</strong> Company value your privacy. This Privacy Policy explains how we collect, use, and protect your information responsibly.
                    </p>
                </header>

                {/* Sections for SEO structure */}
                <article>
                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold mb-2 text-green-900">Information We Collect</h2>
                        <p className="text-gray-700">
                            We may collect personal information such as name, email, and contact details, as well as non-personal information like browsing behavior and cookies.
                        </p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold mb-2 text-green-900">How We Use Your Information</h2>
                        <p className="text-gray-700">
                            Your data is used to improve our services, communicate updates and offers, and process your requests or complaints effectively.
                        </p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold mb-2 text-green-900">Sharing Your Information</h2>
                        <p className="text-gray-700">
                            We do not sell your personal data. It may only be shared with trusted partners for service-related purposes under strict confidentiality.
                        </p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold mb-2 text-green-900">Data Protection</h2>
                        <p className="text-gray-700">
                            We implement strict security measures to protect your information from unauthorized access or misuse.
                        </p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold mb-2 text-green-900">Your Rights</h2>
                        <p className="text-gray-700">
                            You have the right to access, modify, or delete your data. Contact us anytime at <a href="mailto:privacy@yourdomain.com" className="text-green-800 font-medium">privacy@yourdomain.com</a>.
                        </p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold mb-2 text-green-900">Cookies</h2>
                        <p className="text-gray-700">
                            We use cookies to enhance your browsing experience. You can manage or disable cookies from your browser settings at any time.
                        </p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold mb-2 text-green-900">Updates</h2>
                        <p className="text-gray-700">
                            We may update this policy periodically. Please review this page regularly for the latest version.
                        </p>
                    </section>

                    <footer className="mt-10">
                        <h2 className="text-2xl font-semibold mb-2 text-green-900">Contact Us</h2>
                        <p className="text-gray-700">
                            Have questions about our privacy policy? Contact us at <a href="mailto:privacy@yourdomain.com" className="text-green-800 font-medium">privacy@yourdomain.com</a>.
                        </p>
                    </footer>
                </article>
            </main>
        </>
    )
}
