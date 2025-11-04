import React from 'react'
import { motion } from 'framer-motion'
import { FaWifi } from "react-icons/fa";

function Visa(props) {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden relative block bg-gray-800 text-white rounded-2xl w-full sm:h-56 h-45 p-6 shadow-2xl">
            <div className='w-full -z-10'>
                <span className='absolute bg-[#FA692A] -right-30 -top-[3rem] w-[15rem] aspect-square rounded-full blur-xl' />
                <span className='absolute bg-[#FA312A] -right-15 top-15 w-[15rem] aspect-square rounded-full blur-xl' />
                <span className='absolute bg-[#FABB2A] right-16 -top-10 w-[9rem] aspect-square rounded-full blur-xl' />
            </div>

            <div className='flex flex-col'>
                <div className="text-sm mb-2 uppercase tracking-wide text-green-100 z-10 flex justify-between gap-2 charm-bold">
                    <span className='rotate-90'>
                        <FaWifi size={25} />
                    </span>
                    VISA
                </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
                <span className="sm:text-2xl font-mono z-10">
                    {props.number || '#### #### #### ####'}
                </span>
                <div className='flex justify-between items-end '>
                    <span className="sm:text-sm text-xs uppercase font-medium text-gray-300">
                        {props.name || 'Cardholder Name'}
                    </span>
                    <span className="text-sm">{props.expiry || 'MM/YY'}</span>
                </div>
            </div>
        </motion.div>
    )
}

export default Visa
