import React from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


function Line() {
    useGSAP(()=>{
        var tl2 = gsap.timeline({scrollTrigger:{
            trigger : "main" , 
            // start : "0% 0%" , 
            // end : "100% 100%" , 
            scrub : true , 
            // markers : true , 
            pin: true 
          }})
          tl2.to('.line' , { 
            width : "100%"
          })
    })
  return (
    <div className="z-[10000] line w-[0%] h-[4px]   bg-gradient-to-r from-cyan-500 to-blue-500  fixed top-[13%]"></div>
  )
}

export default Line