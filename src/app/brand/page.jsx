'use client'
import React, { Suspense } from 'react'
import BrandRows from './BrandRows.jsx'

function BrandPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Brand Products</h1>
            <Suspense fallback={<p>Loading products...</p>}>
                <BrandRows />
            </Suspense>
        </div>
    )
}

export default BrandPage
