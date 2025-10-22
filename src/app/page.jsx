'use client'

import dynamic from 'next/dynamic'
import React, { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

import MainContainer from './MainContainer'
import Cards from './details/Cards'
const InfiniteScroll = dynamic(() => import('./InfiniteScroll.jsx'), { ssr: false })

import { motion, useAnimation } from 'framer-motion'
import { useMediaQuery } from '@mui/material'

function Home() {

  const smallScreenTop = useMediaQuery('(max-width:640)')
  const targetRef = useRef()

  const handleScroll = () => {
    const topPos = targetRef.current.offsetTop
    const offset = smallScreenTop ? 80 : 90

    window.scrollTo({
      top: topPos - offset,
      behavior: 'smooth',
    })
  }

  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  useEffect(() => {
    if (inView) {
      controls.start({
        width: '100%',
        scale: 1,
        opacity: 1,
        filter: 'brightness(100%)',
        transition: {
          duration: 1.6,
          ease: [0.22, 1, 0.36, 1],
        },
      })
    }
  }, [inView, controls])

  return (
    <div className='flex justify-center flex-col items-center'>
      <MainContainer onClick={handleScroll} />

      {/* green section */}
      <motion.div
        ref={ref}
        initial={{ scale: 0.9, opacity: 0, width: '70%', filter: 'brightness(70%)' }}
        animate={controls}
        className='w-full h-80 bg-green-950 mt-10 relative flex overflow-hidden justify-center items-center shadow-xl'
      >

        {/* first-bg */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute -top-20 -left-20 flex flex-col z-1"
        >
          <span className='relative w-72 aspect-square flex justify-center items-center bg-green-900/50 rounded-full'>
            <span className='relative w-[60%] aspect-square flex bg-green-950 rounded-full' />
          </span>
        </motion.div>

        {/* second-bg */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.5 }}
          className='absolute flex items-center justify-center -bottom-20 -right-20 z-1'
        >
          <span className='relative w-72 aspect-square flex justify-center items-center bg-green-900/50 rounded-full'>
            <span className='relative w-[60%] aspect-square flex bg-green-950 rounded-full' />
          </span>
        </motion.div>

        {/* content */}
        <InfiniteScroll />
      </motion.div>

      <Cards scrolled={targetRef} />
    </div>
  )
}

export default Home
