import gsap from 'gsap';
import React from 'react'

let colorAux = { value: 'text-light' };

const onPaths = {
   cover1: 'M-14.65,-9.38 C164.70,-6.41 283.16,-14.30 517.81,-14.30 L499.77,-0.00 L0.00,-0.00 Z',
   cover2: 'M-19.18,7.41 C242.55,171.21 270.75,177.14 514.43,0.50 L499.77,0.00 L0.00,0.00 Z',
   cover3: 'M-18.04,108.05 C236.90,156.41 273.00,160.35 507.67,110.03 L499.77,0.00 L0.00,0.00 Z',
   cover4: 'M-10.15,159.36 C236.90,156.41 273.00,160.35 509.92,160.35 L499.77,0.00 L0.00,0.00 Z'
}

const outPaths = {
   cover1: 'M-9.01,-14.30 C183.89,-19.24 273.00,-20.22 512.17,-20.22 L499.77,150.00 L0.00,150.00 Z',
   cover2: 'M-11.28,52.79 C183.89,-5.43 252.71,-11.34 511.05,43.91 L499.77,150.00 L0.00,150.00 Z',
   cover3: 'M-15.79,163.31 C183.89,-5.43 252.71,-11.34 523.46,158.39 L499.77,150.00 L0.00,150.00 Z',
   cover4: 'M-15.79,163.31 C185.01,163.31 256.08,164.30 523.46,158.39 L499.77,150.00 L0.00,150.00 Z'
}

function show() {
   return new Promise(res => {

      gsap.timeline()
         .to('.transitionPage .onCover', { duration: 0, attr: { d: onPaths.cover1 }, display: 'block' })
         .to('.transitionPage .outCover', { duration: 0, attr: { d: outPaths.cover1 }, display: 'none' })
         .to('.transitionPage', { display: 'block' })
         .to('.transitionPage .onCover', { duration: .6, attr: { d: onPaths.cover2 }, ease: 'none' })
         .to('.transitionPage .onCover', { duration: .3, attr: { d: onPaths.cover3 }, ease: 'none' })
         .to('.transitionPage .onCover', { duration: .3, attr: { d: onPaths.cover4 }, ease: 'power2.out', onComplete: () => res() })
   })
}

function hide() {
   gsap.timeline()
      .to('.transitionPage .outCover', { display: 'block' })
      .to('.transitionPage .onCover', { display: 'none' })
      .to('.transitionPage .outCover', { duration: .3, attr: { d: outPaths.cover2 }, ease: 'none' })
      .to('.transitionPage .outCover', { duration: .3, attr: { d: outPaths.cover3 }, ease: 'none' })
      .to('.transitionPage .outCover', { duration: .6, attr: { d: outPaths.cover4 }, ease: 'power1.out' })
      .to('.transitionPage', { display: 'none' })
}

const Transition = ({ color }) => {

   return (
      <div className={"transitionPage | absolute h-[100vh] hidden w-full z-50 " + color}>
         <svg className="h-full absolute w-full" viewBox="0 0 500 150" preserveAspectRatio="none">
            <path className="onCover | object-contain" fill="currentColor" d={onPaths.cover1} ></path>
         </svg>
         <svg className="h-full absolute w-full" viewBox="0 0 500 150" preserveAspectRatio="none">
            <path className="outCover | hidden object-contain" fill="currentColor" d={outPaths.cover1} ></path>
         </svg>
      </div>
   )
}


export { Transition, show, hide, colorAux }