'use client'
import { motion, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'

export default function InfiniteScroll() {
    const baseX = useMotionValue(0)
    const [paused, setPaused] = useState(false)
    const containerRef = useRef(null)

    const speed = 50

    useAnimationFrame((t, delta) => {
        if (!paused && containerRef.current) {
            let move = baseX.get() - (speed * delta) / 1000
            const width = containerRef.current.scrollWidth / 2
            if (Math.abs(move) >= width) move = 0
            baseX.set(move)
        }
    })

    const x = useTransform(baseX, (v) => `${v}px`)

    const colors = [
        {
            name: 'food',
            img: 'https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
        },
        {
            name: 'clothes',
            img: 'https://media.istockphoto.com/id/692143450/photo/new-fashion-in-modern-shopping-mall.webp?a=1&s=612x612&w=0&k=20&c=p6dc8f7wk7vYI1qtZBknrRst4ewLZg4gL4-mnTjJQH4=',
        },
        {
            name: 'home',
            img: 'https://plus.unsplash.com/premium_photo-1661964014750-963a28aeddea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
        },
        {
            name: 'jackets',
            img: 'https://media.istockphoto.com/id/626856944/photo/man-clothing.webp?a=1&s=612x612&w=0&k=20&c=J9ANlQI0ZMiNcoD6mlTpMV7br-zDXawlLH_PT6Pe0ek=',
        },
    ]

    const rotations = useMemo(
        () => Array.from({ length: colors.length * 2 }, () => Math.floor(Math.random() * 25 - 15)),
        []
    )

    return (
        <div className="relative overflow-hidden w-full h-full flex items-center">
            <motion.div
                ref={containerRef}
                style={{ x }}
                className="flex absolute gap-6 z-10"
            >
                {colors.concat(colors).map((item, i) => {
                    const rotation = rotations[i % colors.length]
                    return (
                        <motion.div
                            key={i}
                            style={{ transform: `rotate(${rotation}deg)` }}
                            onHoverStart={() => setPaused(true)}
                            onHoverEnd={() => setPaused(false)}
                            className="aspect-video w-80 rounded-2xl hover:scale-105 transition-transform duration-300 shadow-lg overflow-hidden"
                        >
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full object-cover brightness-75 hover:brightness-100 transition-all duration-300"
                            />
                        </motion.div>
                    )
                })}

            </motion.div>
        </div>
    )
}
