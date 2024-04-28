import React from 'react';
import {motion } from 'framer-motion' ;
import { FaArrowRightLong } from "react-icons/fa6";
import  {omega} from "../assets/index";
import { omega2 } from "../assets/index";
import Markey from '../components/Markey';
import Aboutlanding from '../components/Aboutlanding'
import Line from '../components/line' 
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);



export default function Home() {
  useGSAP(()=>{ 
    gsap.from('.textstructure' , { 
      opacity : 0 , 
      duration : 1, 
      delay: .5
    },'a')
    gsap.from('.qr ,.qrimg', {
      opacity: 0 ,
      delay: .5
    },'a')
    })
  return (
   <div  className='w-full h-screen bg-white pt-1'>
    <div className='absolute blur-sm w-[32vh] h-[32vh]  top-[25vh] right-[15vh]'>
      <img className='qrimg' src="https://qrcodedynamic.com/themes/altum/assets/images/qr_code.svg" alt="" />
    </div>
      <h1 className='qr absolute top-[37vh] right-[20vh] uppercase text-[2rem] font-bold text-red-500 bg-white p-2 '>qr scan </h1>
    {/* <div className='absolute top-[60vh] right-[23vh] px-5 py-2 border-[2px] border-zinc-400 font-light text-md uppercase rounded-full'>scan qr</div> */}
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
        <div className=' three border-t-[1px] border-zinc-800 mt-20 flex justify-between items-center py-10 px-20'>
            {['for public and pubvate companies' , 'from the first pitch to ipo'].map((item , index ) => (
                <p className='text-md font-light tracking-tight leading-none'>{item}</p>
            ))}
                {/* <div className='w-10 h-10 flex items-center justify-center border-[2px] border-zinc-400 rounded-full '>
                   <span className='rotate-[45deg]'>
                   <FaArrowRightLong />
                    </span> 
                </div> */}
        </div>
        <Markey />
      <Aboutlanding />
        
    </div>
    
  );
}
