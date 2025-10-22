'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

function MainContainer(props) {

    const router = useRouter()
    // Variants for container
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                ease: "easeOut",
                duration: 0.5,
            },
        },
    };

    // Variants for children (text & button)
    const childVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    };

    const categories = [
        { name: "Clothes", prop: 'mens-shirts', img: "https://plus.unsplash.com/premium_photo-1673125287084-e90996bad505?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600" },
        { name: "Electronics", prop: 'laptops', img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600" },
        { name: "Watches", prop: 'mens-watches', img: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600" },
    ];

    const handleRoute = (prop) => {
        router.push(`/category?name=${prop}`)
    }

    return (
        <div className="w-full flex flex-col justify-center lg:px-20 md:px-15 sm:px-10">
            {/* hero section */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="w-full h-64 md:h-72 bg-gradient-to-b from-orange-100 to-orange-50/10 sm:mt-5 flex items-center p-10 overflow-hidden rounded-lg"
            >
                <motion.div variants={childVariants} className='flex flex-col'>
                    <div>
                        <h1 className="md:text-4xl text-2xl font-bold text-green-950">
                            Exclusive Deals Just For You <br className='sm:flex hidden' />
                            Save Up to <span className="text-green-700">50%</span> on Any Product!
                        </h1>
                    </div>
                    <div className="mt-3">
                        <button onClick={props.onClick} className="cursor-pointer px-6 py-2 bg-green-900 text-white font-semibold rounded-3xl shadow-md hover:bg-green-800 hover:scale-105 focus:outline-none transition transform duration-200">
                            Buy Now
                        </button>
                    </div>
                </motion.div>
            </motion.div>
            <section className="mt-10 flex gap-6 overflow-x-auto sm:px-0 px-5 h-60 w-full overflow-y-hidden py-4 xl:justify-center">
                {categories.map((cat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        onClick={() => handleRoute(cat.prop)}
                        className="relative rounded-xl overflow-hidden group cursor-pointer min-w-[18rem] flex-shrink-0"
                    >
                        <img
                            src={cat.img}
                            alt={cat.name}
                            className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <h3 className="text-white text-xl font-semibold">{cat.name}</h3>
                        </div>
                    </motion.div>
                ))}
            </section>


        </div>
    );
}

export default MainContainer;
