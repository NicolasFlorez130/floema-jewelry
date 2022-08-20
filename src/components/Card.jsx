import gsap from "gsap";
import React, { useRef } from "react"
import { useNavigate } from 'react-router-dom';

const Card = ({ item }) => {

   const nav = useNavigate();
   const card = useRef();


   function clicky() {
      const otherCards = gsap.utils.toArray('.card').filter(c => !(c === card.current));

      gsap.to(otherCards, { duration: .8, opacity: 0, ease: 'power3.out' })
      gsap.to(card.current, { duration: 1, rotate: 0, y: '-100vh', ease: "power3.in" })
      gsap.to('.collectionTitles', { duration: .5, opacity: 0, ease: "power3.in" })
      gsap.to('.title', { duration: .8, top: '100%', ease: "power3.in" })

      setTimeout(() => {
         nav(`/details/${item.collection.toLowerCase()}/${item.name.toLowerCase()}`)
      }, 1000);
   }

   return (
      <div ref={card} className="flex-none card" onClick={clicky}>
         <img className="h-[80vw] mx-[8vw] object-cover w-[55vw]" src={item.product_image.url} alt={item.product_image.alt} />
      </div>
   )
}

export default Card