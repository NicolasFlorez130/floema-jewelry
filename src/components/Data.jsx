import gsap from "gsap"
import { ScrollTrigger as scrollTrigger } from "gsap/ScrollTrigger"
import React, { Fragment } from "react"

gsap.registerPlugin(scrollTrigger)

const Data = ({ reversed = false, info, imgStyles = '' }) => {

   document.querySelectorAll('.about .cover').forEach(cover => {
      gsap.fromTo(cover, { height: '100%' }, {
         scrollTrigger: {
            scroller: '.about > .wrapper',
            trigger: cover,
            start: 'top bottom',
         }, duration: 2, height: 0, ease: 'Power2.in'
      })
   })

   return (
      <section className="data">
         <div className="wrapper | mb-24">
            {!reversed ? (
               <>
                  <div className="grid grid-cols-[25%_75%] mb-12 mx-6">
                     <h3 className="font-['Suisse']">{info.label}</h3>
                     <div className="relative">{info.text.map((line, i) => {
                        return (
                           <Fragment key={i}>
                              <p className="dataPar | mb-4" >{line}</p>
                              <span key={'cover' + i} className="cover | absolute bg-gray bottom-0 h-[100%] w-full"></span>
                           </Fragment>
                        )
                     })}</div>
                  </div>

                  <img className={`object-cover w-full ` + imgStyles} src={info.image} alt={info.label} />
               </>
            ) : (
               <>
                  <img className={`object-cover w-auto ` + imgStyles} src={info.image} alt={info.label} />

                  <div className="grid grid-cols-[25%_75%] mt-12 mx-6">
                     <h3 className="font-['Suisse']">{info.label}</h3>

                     <div className="relative">{info.text.map((line, i) => {
                        return (
                           <Fragment key={i}>
                              <p className="dataPar | mb-4">{line}</p>
                              <span className="cover | absolute bg-gray bottom-0 h-[100%] w-full"></span>
                           </Fragment>
                        )
                     })}</div>
                  </div>
               </>
            )}
         </div>
      </section>
   )
}

export default Data