import React from 'react'
import OrderSummary from './OrderSummary'
import Review from './Review'

function page() {
    return (
        <div className='lg:grid lg:grid-cols-[1fr_30rem] lg:grid-rows-1 flex flex-col sm:px-10 p-3 gap-3'>
            <Review />
            <OrderSummary />
        </div>
    )
}

export default page
