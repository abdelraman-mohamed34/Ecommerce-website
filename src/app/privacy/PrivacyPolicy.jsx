'use client'
import React from 'react'
import { useSelector } from 'react-redux'

export default function PrivacyPolicy() {
    const theme = useSelector((state) => state.theme)
    const currentColors = theme.colors[theme.color]

    return (
        <main className={`max-w-4xl mx-auto px-6 py-12 transition-colors duration-500`}>
            {/* Main Heading */}
            <header>
                <h1 className={`text-3xl font-bold mb-6 ${currentColors.text}`}>Privacy & Policy</h1>
                <p className={`${currentColors.cardText} mb-4`}>
                    We at <strong>Abdelrahman Mohamed</strong> Company value your privacy.
                    This Privacy Policy explains how we collect, use, and protect your information responsibly.
                </p>
            </header>

            {/* Sections */}
            <article>
                <section className="mt-8">
                    <h2 className={`text-2xl font-semibold mb-2 ${currentColors.accent}`}>Information We Collect</h2>
                    <p className={currentColors.cardText}>
                        We may collect personal information such as name, email, and contact details,
                        as well as non-personal information like browsing behavior and cookies.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className={`text-2xl font-semibold mb-2 ${currentColors.accent}`}>How We Use Your Information</h2>
                    <p className={currentColors.cardText}>
                        Your data is used to improve our services, communicate updates and offers,
                        and process your requests or complaints effectively.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className={`text-2xl font-semibold mb-2 ${currentColors.accent}`}>Sharing Your Information</h2>
                    <p className={currentColors.cardText}>
                        We do not sell your personal data. It may only be shared with trusted partners for
                        service-related purposes under strict confidentiality.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className={`text-2xl font-semibold mb-2 ${currentColors.accent}`}>Data Protection</h2>
                    <p className={currentColors.cardText}>
                        We implement strict security measures to protect your information from unauthorized access or misuse.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className={`text-2xl font-semibold mb-2 ${currentColors.accent}`}>Your Rights</h2>
                    <p className={currentColors.cardText}>
                        You have the right to access, modify, or delete your data. Contact us anytime at{" "}
                        <a href="mailto:privacy@yourdomain.com" className={`${currentColors.accent} font-medium`}>
                            privacy@yourdomain.com
                        </a>.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className={`text-2xl font-semibold mb-2 ${currentColors.accent}`}>Cookies</h2>
                    <p className={currentColors.cardText}>
                        We use cookies to enhance your browsing experience. You can manage or disable cookies
                        from your browser settings at any time.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className={`text-2xl font-semibold mb-2 ${currentColors.accent}`}>Updates</h2>
                    <p className={currentColors.cardText}>
                        We may update this policy periodically. Please review this page regularly for the latest version.
                    </p>
                </section>

                <footer className="mt-10">
                    <h2 className={`text-2xl font-semibold mb-2 ${currentColors.accent}`}>Contact Us</h2>
                    <p className={currentColors.cardText}>
                        Have questions about our privacy policy? Contact us at{" "}
                        <a href="mailto:privacy@yourdomain.com" className={`${currentColors.accent} font-medium`}>
                            privacy@yourdomain.com
                        </a>.
                    </p>
                </footer>
            </article>
        </main>
    )
}
