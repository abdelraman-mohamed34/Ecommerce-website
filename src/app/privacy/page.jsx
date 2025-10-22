import React from "react";
import PrivacyPolicy from "./PrivacyPolicy.jsx";

export const metadata = {
    title: "Privacy Policy | Abdelrahman Mohamed",
    description:
        "Read our Privacy Policy to learn how Abdelrahman Mohamed collects, uses, and protects your personal information responsibly.",
    keywords: [
        "Privacy Policy",
        "Privacy",
        "Policy",
        "Data Protection",
        "Cookies",
        "Abdelrahman Mohamed",
        "Online Store Policy",
    ],
    openGraph: {
        title: "Privacy Policy | Abdelrahman Mohamed",
        description:
            "Learn how we collect, use, and protect your data to ensure your privacy and security.",
        url: "https://yourwebsite.com/privacy-policy",
        images: [
            {
                url: "https://yourwebsite.com/images/privacy-cover.jpg",
                width: 1200,
                height: 630,
                alt: "Privacy Policy Cover",
            },
        ],
    },
    other: {
        // structured data for Google
        "application/ld+json": JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PrivacyPolicy",
            name: "Privacy Policy",
            url: "https://yourwebsite.com/privacy-policy",
            description:
                "Learn how Abdelrahman Mohamed collects, uses, and protects your data.",
            publisher: {
                "@type": "Organization",
                name: "Abdelrahman Mohamed",
                url: "https://yourwebsite.com",
            },
        }),
    },
};

export default function PrivacyPolicyPage() {
    return <PrivacyPolicy />;
}
