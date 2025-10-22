'use client'

import React from 'react';
import CategoryRows from './CategoryRows';

export default function ProductsPage() {
    return (
        <div className="p-5">
            <div className='xl:px-25 lg:px-0 md:px-25'>
                <h1 className="text-2xl font-bold mb-4">Products</h1>
            </div>
            <CategoryRows />
        </div>
    );
}
