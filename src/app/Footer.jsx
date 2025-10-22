// Footer.jsx
import React from "react";
import { ImLinkedin } from "react-icons/im";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const themes = {
    light: {
        bg: "bg-gray-200/70",
        text: "text-gray-600",
        heading: "text-gray-900",
        link: "hover:text-gray-900",
        border: "border-gray-300",
        brand: "Abdelrahman Mohamed",
    },
    dark: {
        bg: "bg-gray-900",
        text: "text-gray-300",
        heading: "text-white",
        link: "hover:text-white",
        border: "border-gray-700",
        brand: "Abdelrahman Mohamed",
    },
};

export default function Footer({ theme = "light" }) {
    const colors = themes[theme];

    return (
        <footer className={`${colors.bg} ${colors.text} border-t ${colors.border} z-8`}>
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-0">
                    {/* Logo & Description */}
                    <div className="md:w-1/3">
                        <h2 className={`text-2xl font-bold ${colors.heading}`}>{colors.brand}</h2>
                        <p className="mt-4 text-gray-500">
                            We provide the best solutions for your business. Stay connected
                            with us for updates and offers.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:w-2/3">
                        {
                            [
                                {
                                    title: "Product",
                                    links: [
                                        { name: "Features", click: '/feature' },
                                        { name: "Pricing", click: '/pricing' },
                                        { name: "Integrations", click: '/Integrations' },
                                    ],
                                },
                                {
                                    title: "Company",
                                    links: [
                                        { name: "About", click: '/about' },
                                        { name: "Careers", click: '/career' },
                                        { name: "Blog", click: '/blog' },
                                    ],
                                },
                                {
                                    title: "Support",
                                    links: [
                                        { name: "Help Center", click: '/customer-support-form' },
                                        { name: "Contact Us", click: '/contact' },
                                        { name: "Privacy Policy", click: '/privacy' },
                                    ],
                                },
                            ]
                                .map((section, idx) => (
                                    <div key={idx}>
                                        <h3 className={`text-sm font-semibold tracking-wider uppercase ${colors.heading}`}>
                                            {section.title}
                                        </h3>
                                        <ul className="mt-4 space-y-2">
                                            {section.links.map((link) => (
                                                <li key={link.name}>
                                                    <Link href={link.click} className={colors.link}>
                                                        {link.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className={`mt-12 border-t ${colors.border} pt-6 flex flex-col md:flex-row justify-between items-center`}>
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} made by <strong>{colors.brand}</strong>, Inc. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        {[
                            {
                                id: 1,
                                name: "linkedIn",
                                route: null,
                                icon: <ImLinkedin />,
                            },
                            {
                                id: 2,
                                name: "github",
                                route: 'https://github.com/abdelraman-mohamed34',
                                icon: <FaGithub />,
                            },
                        ].map((social) => (
                            <a key={social.id} href={social.route} className={colors.link} target="_blank" rel="noopener noreferrer">{social.icon}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
