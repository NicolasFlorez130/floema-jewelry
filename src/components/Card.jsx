import gsap from "gsap";
import React, { useRef } from "react"
import { useNavigate } from 'react-router-dom';

const Card = ({ item }) => {

   const nav = useNavigate();
   const card = useRef();

   function clicky() {
      const otherCards = gsap.utils.toArray('.card').filter(c => !(c === card.current));

      gsap.to(otherCards, { duration: .8, opacity: 0, ease: 'power3.out' })
      gsap.to('.collections .title', { duration: .8, top: '100%', ease: "power3.in" })
      gsap.to('.collections .collectionTitles', { duration: .5, opacity: 0, ease: "power3.in" })
      gsap.to('.collections nav', { duration: 1, top: '-40%', ease: "power3.in" })
      gsap.to(card.current, {
         duration: 1, rotate: 0, y: '-100vh', ease: "power3.in", onComplete: () => {
            nav(`/details/${item.collection.toLowerCase()}/${item.name.toLowerCase()}`)

         }
      })
   }

   return (
      <div ref={card} className="flex-none card" onClick={clicky}>
         <img className="aspect-[3/4] h-[80vw] max-h-[50vh] mx-[8vw] object-cover
         sm:h-[60vw] | lg:h-[40vw] lg:mx-[6vw] xl:mx-[4vw]" src={item.product_image.url} alt={item.product_image.alt} />
      </div>
   )
}

export default Card