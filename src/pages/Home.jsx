import React, { } from "react"
import { Link } from "react-router-dom";

const Home = () => {

   return (
      <>
         <h1 className="home_title">Home</h1>
         <Link to="/collections">
            <hr />
            Collections
         </Link>
         <Link to="/about">
            <hr />
            About
         </Link>
      </>

   )
}

export default Home