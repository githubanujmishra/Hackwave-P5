import { motion } from 'framer-motion'
import React from 'react'

function markey() {
  return (
    <div  className='w-full py-20 rounded-tl-3xl rounded-tr-3xl bg-[#008DDA] '>
        <div className="text-[#ACE2E1] border-t-2 border-b-2 border-zinc-300 flex overflow-hidden whitespace-nowrap ">
            <motion.h1 initial={{ x: "0" }} animate={{x:"-100%"}} transition={{repeat:Infinity , ease: "linear" , duration : 10 }} className='text-[24vw] leading-none font-black uppercase mb-[2vw] pr-20'>
              omegasquad  
              </motion.h1>
            <motion.h1 initial={{x :"0" }} animate={{x:"-100%"}} transition={{repeat:Infinity , ease: "linear" , duration : 10 }} className='text-[24vw] leading-none font-black uppercase mb-[2vw] pr-20'>
              omegasquad  
              </motion.h1>
        </div>
    </div>
  )
}

export default markey