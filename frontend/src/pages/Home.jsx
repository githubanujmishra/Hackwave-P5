import React from 'react';
import {motion } from 'framer-motion' ;
import { FaArrowRightLong } from "react-icons/fa6";
import  {omega} from "../assets/index";
import { omega2 } from "../assets/index";

export default function Home() {
  return (
   <div className='w-full h-screen bg-white pt-1'>
        <div className="textstructure mt-40 px-20">
            {['welcome' , 'we our' , 'omega squad'].map((items , index) => {
                return <div className="masker ">
                    <div className='w-fit flex items-center'>
                        {index === 1 && (
                        <motion.div initial={{width:0}} animate={{width: "9vw" , rotate : 360}} transition={{ease :[0.76, 0, 0.24, 1] , duration: 1 , delay: 2 }} className='flex items-center justify-center rounded-md w-[9vw] h-[6vw] relative top-[.5vw] bg-transparent'>
                          <img className='h-[130%] ' src={omega2} alt="omega" />
                        </motion.div>
                         )}
                    <h1 className='flex items-center uppercase text-9xl leading-[7vw] tracking-tighter font-medium font-["Test Founders Grotesk X-Cond SmBd"]'>
                    {items}
                    </h1>
                    </div>
                
            </div>
            })}
            
           
        </div>
        <div className='three border-t-[1px] border-zinc-800 mt-20 flex justify-between items-center py-5 px-20'>
            {['for public and pubvate companies' , 'from the first pitch to ipo'].map((item , index ) => (
                <p className='text-md font-light tracking-tight leading-none'>{item}</p>
            ))}
            <div className='start flex items-center gap-5'>
                <div className='px-5 py-2 border-[2px] border-zinc-400 font-light text-md uppercase rounded-full'>start the project</div>
                <div className='w-10 h-10 flex items-center justify-center border-[2px] border-zinc-400 rounded-full '>
                   <span className='rotate-[45deg]'>
                   <FaArrowRightLong />
                    </span> 
                </div>
            </div>
        </div>
    </div>
  );
}
