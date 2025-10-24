'use client'
import React, { Suspense } from 'react'
import SearchContent from './searchContent'

function Page() {
    return (
        <Suspense fallback='loading...'>
            <SearchContent />
        </Suspense>
    )
}

export default Page
