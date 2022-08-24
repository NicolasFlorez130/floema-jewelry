import gsap from "gsap"
import { ScrollTrigger as scrollTrigger } from "gsap/ScrollTrigger"
import React, { Fragment } from "react"

gsap.registerPlugin(scrollTrigger)

const Data = ({ reversed = false, info, imgStyles = '' }) => {

   return (
      <section className="data">
         <div className="wrapper | mb-24">
            <img className={`object-cover mb-12 w-full ${imgStyles} ${reversed ? 'block' : 'hidden'}`} src={info.image} alt={info.label} />
            <div className="grid grid-cols-[25%_75%] mx-6">
               <h3 className="break-words font-['Suisse'] pr-4">{info.label}</h3>
               <div className="relative">{info.text.map((line, i) => {
                  return (
                     <Fragment key={i}>
                        <p className="dataPar | mb-4" >{line}</p>
                        <span key={'cover' + i} className="cover | absolute bg-gray bottom-0 h-[100%] w-full"></span>
                     </Fragment>
                  )
               })}</div>
            </div>
            <img className={`object-cover mt-12 w-full ${imgStyles} ${reversed ? 'hidden' : 'block'}`} src={info.image} alt={info.label} />
         </div>
      </section>
   )
}

export default Data