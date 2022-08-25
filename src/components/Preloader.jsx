import gsap from "gsap";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react"
import { ProductsContext } from "../App"

const Preloader = ({ charged }) => {

   const products = useContext(useMemo(() => ProductsContext));

   const preloader = useRef()

   const [progress, setProgress] = useState(() => 0)
   const aux = { value: 0 }

   useEffect(() => {

      if (!products?.id) return;

      const tl = gsap.timeline();

      tl.fromTo('.preloader .letter1', { y: 20 }, { duration: .05, opacity: 1, y: 0, stagger: .03 })
      tl.fromTo('.preloader .letter2', { y: 20 }, { duration: .05, opacity: 1, y: 0, stagger: .03 }, '-=.5')
      tl.fromTo('.preloader .letter3', { y: 20 }, { duration: .05, opacity: 1, y: 0, stagger: .03 }, '-=.3')
      tl.to(aux, {
         duration: 4, value: 100, ease: 'power2.inOut', onUpdate: () => {
            parseInt(aux.value) !== progress && setProgress(parseInt(aux.value))
         }, onComplete: () => charged(true)
      }, '-=.3')

      tl.to('.preloader .letter1', { duration: .05, opacity: 0, y: -20, stagger: .03 }, '-=.5')
      tl.to('.preloader .letter2', { duration: .05, opacity: 0, y: -20, stagger: .03 }, '-=.5')
      tl.to('.preloader .letter3', { duration: .05, opacity: 0, y: -20, stagger: .03 }, '-=.3')

      tl.to(preloader.current, { duration: 1, opacity: 0, ease: 'power4.in' })
      tl.to(preloader.current, { display: 'none' })

      // charged(true) // to change

   }, [products])

   return (
      <div ref={preloader} className="preloader | absolute bg-orange flex h-full items-center justify-center text-light w-full z-50">
         <p className="flex flex-col font-['George'] text-2xl text-center">
            <span className="flex justify-center">{
               'The surprise of what is possible'.split('').map((letter, i) => <span key={i} className="letter1 | flex-none min-w-[.5rem] opacity-0">{letter}</span>)
            }</span>
            <span className="flex justify-center">{
               'to create from a single,'.split('').map((letter, i) => <span key={i} className="letter2 | flex-none min-w-[.5rem] opacity-0">{letter}</span>)
            }</span>
            <span className="flex justify-center">{
               'thin thread.'.split('').map((letter, i) => <span key={i} className="letter3 | flex-none min-w-[.5rem] opacity-0">{letter}</span>)
            }</span>
         </p>
         <p className="count | absolute bottom-0 m-auto pb-12 text-lg">{progress}%</p>
      </div>
   )
}

export default Preloader