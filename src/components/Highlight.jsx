import React, { useEffect, useRef } from "react"

const Highlight = ({ info }) => {
   return (
      <section className="highlight | mb-24">
         <div className="wrapper | relative">
            <img className="absolute w-1/2 z-10" src={info.image_1} alt={info.title} />
            <p className="[writing-mode:vertical-rl] cursor-pointer font-['George'] mx-auto py-[40%] rotate-180 text-[40vw] transition-[.2s] hover:text-light">{info.title}</p>
            <img className="absolute w-1/2 bottom-0 right-0" src={info.image_2} alt={info.title} />
         </div>
      </section>
   )
}

export default Highlight