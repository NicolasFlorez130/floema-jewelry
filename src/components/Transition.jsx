import gsap from 'gsap';
import React, { useEffect } from 'react'

let colorAux = { value: 'text-light' };

const onPaths = {
   cover1: 'M-17.27,-5.42 C310.61,-11.34 220.31,-21.21 509.81,-6.41 L500.00,0.00 L0.00,0.00 Z',
   cover2: 'M-17.27,-5.43 C272.23,224.50 246.84,227.46 509.81,-6.41 L500.00,-0.00 L0.00,-0.00 Z',
   cover3: 'M-7.67,163.31 C234.98,212.66 242.89,217.59 515.46,157.40 L500.00,0.00 L-0.33,-39.96 Z',
}

const outPaths = {
   cover1: 'M-6.54,-59.70 C240.63,-58.71 244.01,-69.56 506.99,-54.76 L500.00,150.00 L0.00,150.00 Z',
   cover2: 'M-6.54,155.42 C240.63,-58.71 244.01,-69.56 506.43,160.35 L500.00,150.00 L0.00,150.00 Z',
   cover3: 'M-6.54,155.42 C226.52,155.42 233.29,163.31 506.43,160.35 L500.00,150.00 L0.00,150.00 Z',
}

function show() {
   return new Promise(res => {
      gsap.timeline()
         .to('.transitionPage .onCover', { duration: 0, attr: { d: onPaths.cover1 }, display: 'block' })
         .to('.transitionPage .outCover', { duration: 0, attr: { d: outPaths.cover1 }, display: 'none' })
         .to('.transitionPage', { display: 'block' })
         .to('.transitionPage .onCover', { duration: .6, attr: { d: onPaths.cover2 }, ease: 'none' })
         .to('.transitionPage .onCover', { duration: .6, attr: { d: onPaths.cover3 }, ease: 'power1.out', onComplete: () => res() })
   })
}

function hide() {
   gsap.timeline()
      .to('.transitionPage .outCover', { display: 'block' })
      .to('.transitionPage .onCover', { display: 'none' })
      .to('.transitionPage .outCover', { duration: .6, attr: { d: outPaths.cover2 }, ease: 'none' })
      .to('.transitionPage .outCover', { duration: .6, attr: { d: outPaths.cover3 }, ease: 'power1.out' })
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