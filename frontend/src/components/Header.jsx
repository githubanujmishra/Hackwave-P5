import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { omega } from "../assets/index";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


// When the user is Logged in.
function Header() {
  const { currentUser } = useSelector((state) => state.user);
  useGSAP(()=> {
    gsap.from('.omega' , { 
      opacity: 0,
      y:-80
      // scale: 2
    })
    gsap.from('.nav' , { 
      duration: 1,
      opacity: 0,
      y:-80
      // scale: 2
    })
    gsap.from('.home , .about , .signin' , { 
      delay: .5,
      y : -80, 
      opacity: 0,
      // stagger: 1, 
      duration: 1
      // scale: 2
    })
    
    
  })
  return (
    <div  className="nav z-[10000000000] bg-gradient-to-r from-[#008DDA]/30   to-[#41C9E2]/60 mix-blend-darken fixed w-[100%] backdrop-opacity-10 backdrop-invert">
      <div className="flex justify-between items-center h-[13vh] p-3 px-[5%]">
        <Link to="/">
          <img src={omega} alt="omega" className="omega h-[8vh]" />
        </Link>

        <ul className="flex gap-20 text-[1.2vw] font-bold uppercase  ">
          {currentUser ? (
            <Link to="/create">
              <li>Create</li>
            </Link>
          ) : (
            <Link to="/">
              <li className="home text-transparent bg-clip-text bg-gradient-to-r from-[#874CCC]/100 via-[#008DDA]   to-[#10439F]/80">Home</li>
            </Link>
          )}

          {currentUser ? (
            <Link to="/dashboard">
              <li>Dashboard</li>
            </Link>
          ) : (
            <Link to="/about">
              <li className="about text-transparent bg-clip-text bg-gradient-to-r from-[#874CCC]/100 via-[#008DDA]   to-[#10439F]/80">About</li>
            </Link>
          )}
          {currentUser ? (
            <Link to="/profile">
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
            </Link>
          ) : (
            <Link to="/profile">
              <li className="signin text-transparent bg-clip-text bg-gradient-to-r from-[#874CCC]/100 via-[#008DDA]   to-[#10439F]/80">Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
