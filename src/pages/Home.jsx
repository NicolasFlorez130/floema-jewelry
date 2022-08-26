import gsap from "gsap";
import Draggable from "gsap/Draggable";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react"
import { HomeContext, ProductsContext } from "../App";
import CollectionsTitle from "../components/CollectionsTitle";
import Nav from "../components/Nav";
import { useNavigate } from 'react-router-dom'
import { ColorContext } from '../App';
import { hide, show } from "../components/Transition";


let homeAux = 0;
let imagesAux = 0;

gsap.registerPlugin(Draggable);

const Home = ({ charged }) => {

   const doc = useContext(useMemo(() => HomeContext));
   const doc2 = useContext(useMemo(() => ProductsContext));

   const setColor = useContext(useMemo(() => ColorContext));

   const [images, setImages] = useState(() => []);
   const [titles, setTitles] = useState(() => []);

   const title = useRef()
   const titlesCont = useRef()

   const nav = useNavigate();

   async function buttonClick() {
      setColor('text-light')
      await show();
      nav('/collections')
      hide()
   }

   useEffect(() => {
      doc?.data.images.length > 0 && setImages(doc.data.images);
      doc2?.data.body.length > 0 && setTitles(doc2.data.body);

      (images?.length <= 0 || titles?.length <= 0) && homeAux++;

   }, [doc, homeAux])

   useEffect(() => {

      if (images.length <= 0 || titles.length <= 0 || !charged) return;

      const mm = gsap.matchMedia()

      const bgImages = gsap.utils.toArray('.home .backgroundImage');

      bgImages.forEach(img => {
         const random = Math.random();
         gsap.fromTo(img, { opacity: 0, scale: 1 + random }, { duration: 1 * random, opacity: 1, scale: 1, delay: .5 + random, ease: '"power4.in"' })
      })

      const length = bgImages.length;

      mm.add('(min-width: 1024px)', () => {

         gsap.to('.home .image0', { y: Math.random() * 50 + 'vw' })
         gsap.to('.home .image1', { y: Math.random() * 50 + 'vw' })
         gsap.to('.home .image2', { y: Math.random() * 50 + 'vw' })
         gsap.to('.home .image3', { y: Math.random() * 50 + 'vw' })
         gsap.to('.home .image4', { y: Math.random() * 50 + 'vw' })
         
      })

      gsap.to('.home .titlesContainer', { duration: 30, yPercent: -50, ease: 'none', repeat: -1 })
      gsap.to('.home .imagesContainerSm', { duration: 40, yPercent: 50, ease: 'none', repeat: -1 })

   }, [images, charged])


   return (
      <section className="home | bg-orange h-[100vh] overflow-hidden relative ">
         <Nav color={'text-light'} buttonValue={'About'} />
         <div className="gradient | fixed bg-gradient-to-b  from-orange h-1/3 to-orange/0 top-0 w-full z-10"></div>
         <div className="gradient | fixed bg-gradient-to-t  from-orange h-1/3 to-orange/0 bottom-0 w-full z-10"></div>
         <div className="imagesContainerSm | w-full absolute bottom-0 z-0">
            {[1, 2].map(n => {
               return (<div key={n} className={`imagesGrid | flex-none gap-4 grid grid-cols-2 px-4 py-2 w-full 
                  sm:grid-cols-3 | lg:grid-cols-5`}>
                  {
                     images.map((img, i) => {
                        imagesAux >= 5 ? imagesAux = 0 : 0;
                        return <img src={img.image.url} className={`image${imagesAux++} backgroundImage | aspect-[2/3] object-cover relative w-full`} alt="Floema jewelry home image" key={i} />
                     })
                  }
               </div>)
            })}
         </div>
         <div className="colorLayer | absolute bg-orange/60 h-full inset-0 w-full "></div>
         <div ref={titlesCont} className="titlesContainer | absolute top-0 w-full">
            <CollectionsTitle ref={title} collections={titles} styles={'relative'} />
            <CollectionsTitle collections={titles} styles={'relative'} />
         </div>
         <div className="flex justify-center items-end h-[100vh] w-full">
            <button onClick={buttonClick} className="relative font-['Suisse'] border-2 border-light bottom-0 mb-6 py-4 px-16 rounded-[50%] text-light w-max z-30
               lg:text-xs">
               DISCOVER COLLECTIONS
            </button>
         </div>
      </section>
   )
}

export default Home