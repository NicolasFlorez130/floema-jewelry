import gsap from "gsap";
import React, { useEffect, useRef } from "react"
import { Link } from "react-router-dom";

const Home = () => {
   return (
      <div className="pt-20">
         <Link to="/collections">
            <hr />
            Collections
         </Link>
         <Link to="/about">
            <hr />
            About
         </Link>
      </div>

   )
}

export default Home