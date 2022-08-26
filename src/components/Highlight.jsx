import React, { useEffect, useRef } from "react"

const Highlight = ({ info }) => {

   return (
      <section className="highlight | m-auto max-w-[1200px] mb-24
         lg:px-6">
         <div className="wrapper | relative">
            <img className="absolute max-w-[500px] w-1/2 z-10" src={info.image_1} alt={info.title} />
            <p className="[writing-mode:vertical-rl] cursor-pointer font-['George'] mx-auto py-[40%] rotate-180 text-[40vw] transition-[.2s] hover:text-light
               lg:text-[15rem]">{info.title}</p>
            <img className="absolute bottom-0 max-w-[500px] right-0 w-1/2" src={info.image_2} alt={info.title} />
         </div>
      </section>
   )
}

export default Highlight