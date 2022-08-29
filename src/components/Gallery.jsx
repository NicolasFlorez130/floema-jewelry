import gsap from 'gsap';
import Observer from 'gsap/Observer';
import React, { useEffect, useRef, useState } from 'react'

let galleryAux = 0;

gsap.registerPlugin(Observer);

const Gallery = ({ images = [], id = '' }) => {

   const imagesContainer = useRef();
   const rotationAux = useRef();

   const [size, setSize] = useState(0)

   useEffect(() => {

      if (images.length <= 0) {
         galleryAux++;
         return;
      }

      setSize(images.length * 34 + '%');

      const mm = gsap.matchMedia();

      mm.add('(min-width: 640px)', () => {
         setSize(images.length * 25 + '%');
      })

      mm.add('(min-width: 1024px)', () => {
         setSize(images.length * 20 + '%');
      })

      mm.add('(min-width: 1536px)', () => {
         setSize(images.length * 14 + '%');
      })

      if (size === 0) {
         galleryAux++;
         return;
      }

      imagesContainer.current.style.width = size
      rotationAux.current.style.width = size

      const imageContainers = gsap.utils.toArray(`#${id} .imageContainer`);
      const imgs = gsap.utils.toArray(`#${id} .imageContainer img`);

      imageContainers.forEach((cont, i) => {
         cont.style.transformOrigin = `${imagesContainer.current.offsetWidth / 2}px`
         gsap.to(cont, { rotate: 360 / imageContainers.length * i })
         gsap.to(imgs[i], { rotate: -90 })

      })

      const tl = gsap.timeline({ repeat: -1 })
      tl.fromTo(imagesContainer.current, { rotate: 0 }, { rotate: 180, duration: imageContainers.length * 1.5, ease: 'none' });

      Observer.create({
         target: window,
         type: 'wheel, touch, scroll, pointer',
         onDown: () => {
            const rotation = gsap.getProperty(rotationAux.current, 'rotation')
            gsap.to(rotationAux.current, { duration: 3, rotate: 20 + rotation, ease: 'Power3.in' })
         },
         onUp: () => {
            const rotation = gsap.getProperty(rotationAux.current, 'rotation')
            gsap.to(rotationAux.current, { duration: 3, rotate: -30 + rotation, ease: 'Power3.in' })
         }
      })

   }, [galleryAux])

   return (
      <div id={id} className="overflow-hidden pt-16 flex h-[90vw] items-start justify-center
         sm:h-[60vw] | lg:h-[50vw] | xl:h-[35vw]">
         <div ref={rotationAux} className="relative h-min flex items-start justify-center">
            <div ref={imagesContainer} className={`aspect-square flex flex-none items-center justify-center relative`}>
               {[...images, ...images].map((image, i) => {
                  return (
                     <figure key={i} className="imageContainer | h-max w-max absolute left-0">
                        <img src={image} alt="floema" className="aspect-[2/3] h-[60vw] object-cover
                           sm:h-[40vw] | lg:h-[30vw] | 2xl:h-[20vw]" />
                     </figure>
                  )
               })}
            </div>
         </div>
      </div>
   )
}

export default Gallery