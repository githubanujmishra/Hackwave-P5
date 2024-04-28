import React from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function About() {
  useGSAP(()=> {
    var tl2 = gsap.timeline({scrollTrigger:{
      trigger : ".about" , 
      start : "0% 70%" , 
      end : "30% 70%" , 
      scrub : true , 
      // markers : true , 
      // pin: true 
    }})
    tl2.from('.up' , { 
      opacity: 0,
      y:60
      // scale: 2
    })

    var tl2 = gsap.timeline({scrollTrigger:{
      trigger : ".about" , 
      start : "40% 70%" , 
      end : "65% 70%" , 
      scrub : true , 
      markers : true , 
      // pin: true 
    }})
    tl2.from('.mid1 ,.mid2' , { 
      opacity: 0,
      y:60
      // scale: 2
    })
  })
  return (
    <div  className='z-[1000] about w-full p-20 bg-[#A3FFD6] rounded-tl-3xl rounded-tr-3xl text-black'>
        <h1 className='up  text-[2.7vw] leading-[4vw] tracking-tight uppercase '>Ochi is a strategic partner for fast-growing tech businesses that need to raise funds, sell products, explain complex ideas, and hire great people.</h1>
        <div className='w-full flex gap-5 border-t-[1px] pt-10 mt-20 border-[#a1b562]'>
            <div className=' mid1 w-1/2'>
                <h1 className=' text-7xl uppercase font-bold tracking-[-4px]'>our approach :</h1>
                <p className=' w-4/5 mt-10 text-[1.2rem] '>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam quaerat officia quisquam, cum dolorum inventore. Sint corporis accusantium excepturi perferendis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui perspiciatis earum itaque similique, recusandae quaerat optio beatae obcaecati sit doloribus!</p>
                <button className='flex uppercase gap-10 items-center px-10 py-6 mt-10 bg-zinc-900 rounded-full text-white'>read more 
                   <div className='w-2 h-2 bg-zinc-100 rounded-full'>
                   </div>
                </button>
            </div>
            <div className=' mid2 w-1/2 h-[70vh] rounded-3xl bg-[#b0c859]  object-cover'>
                    <img className='w-full h-full object-cover rounded-3xl ' src="https://plus.unsplash.com/premium_photo-1661490843219-bafbfc11939e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

            </div>
        </div>
    </div>
  )
}

export default About