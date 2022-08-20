import React from 'react'
import { Link } from 'react-router-dom';
import sizes from '../assets/icons/sizes.svg'
import star from '../assets/icons/star.svg'
import { useRef } from 'react';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger as scrollTrigger } from 'gsap/ScrollTrigger';
import Scrollbar from 'smooth-scrollbar';

let passed = false;

const ItemData = ({ item }) => {

   gsap.registerPlugin(scrollTrigger);

   const wrapper = useRef();
   const container = useRef();
   const image = useRef();

   function switchImage() {
      const tl = gsap.timeline()
      tl.to(image.current, { duration: .5, rotateY: 90, scaleY: 1.05, ease: 'power3.in' })
      setTimeout(() => {
         image.current.src = image.current.src === item.product_image.url ? item.model_image.url : item.product_image.url;
      }, 500);
      tl.to(image.current, { duration: .5, rotateY: 0, scaleY: 1, ease: 'power3.out' })
   }

   useEffect(() => {
      gsap.fromTo(image.current, { y: '-100vh' }, { duration: .8, y: 0, ease: 'power3.in', opacity: 1 })


      if (item) {

         passed = true;

         const wrapper = document.querySelector('.itemData > .wrapper');

         const wrapperScroll = Scrollbar.init(wrapper, { smooth: true })

         wrapperScroll.setPosition(0, 0);
         wrapperScroll.track.xAxis.element.remove();

         scrollTrigger.scrollerProxy('.itemData > .wrapper', {
            scrollTop(value) {
               if (arguments.length) {
                  wrapperScroll.scrollTop = value;
               }
               return wrapperScroll.scrollTop;
            }
         });

         wrapperScroll.addListener(scrollTrigger.update);

         gsap.utils.toArray('.aboutCover').forEach(cover => {
            gsap.to(cover, {
               scrollTrigger: {
                  scroller: '.itemData > .wrapper',
                  trigger: cover,
                  start: 'bottom 95%',
                  end: '200% top',
                  markers: true
               }, duration: .3, height: 0, ease: 'Power2.in'
            })
         })

         if (document.querySelector('.gsap-marker-scroller-start')) {
            const markers = gsap.utils.toArray('[class *= "gsap-marker"]');
            wrapperScroll.addListener(({ offset }) => gsap.set(markers, { marginTop: -offset.y }));
         }
      }

   }, [item])


   return (
      <section ref={container} className=" itemData | font-extralight text-light">
         <div ref={wrapper} className="wrapper | h-[100vh] pb-14 pt-24 px-6">
            {/* <Scroll_About selector={'.itemData > .wrapper'} /> */}
            <div className="imageWrapper | pb-8 relative">
               <img ref={image} onClick={switchImage} className="image | h-[126vw] m-auto object-cover opacity-0 w-[100%]" src={item.product_image.url} alt={item.alt} />
               <img className="hidden" src={item.model_image.url} alt={item.alt} />
            </div>
            <div className="title | relative">
               <span className="aboutCover | absolute bg-brown bottom-0 h-full w-full"></span>
               <h2 className="font-['Suisse'] text-lg uppercase">{item.collection}</h2>
               <h1 className="text-8xl">{
                  item.name.replaceAll('-', ' ').split('_').map((span, i) => {
                     return (i === 2 ? (
                        <span key={i} className="flex gap-2 items-center" >{
                           span.split(' ').map((subSpan, i) => (
                              i === 1 ? (
                                 <span key={i} className="text-6xl"> {subSpan} </span>
                              ) : (
                                 <span key={i} className="text-xl">{subSpan}</span>
                              )
                           ))
                        }<br /></span>
                     ) : (
                        <span key={i}>{span}<br /></span>
                     ))
                  })
               }</h1>
            </div>
            <div className="technicDetails | py-5 relative">
               <span className="aboutCover | absolute bg-brown bottom-0 h-full w-full"></span>
               <div className="sizes | flex items-center mr-6 my-6">
                  <span className="icon">
                     <img className="w-12 mr-10" src={sizes} alt="sizes icon" />
                  </span>
                  <span>
                     {item.sizes}
                  </span>
               </div>
               <div className="materials | flex items-center my-6">
                  <span className="icon">
                     <img className="w-12 mr-10" src={star} alt="sizes icon" />
                  </span>
                  <span>
                     {item.material}
                  </span>
               </div>
            </div>
            <div className="moreInfo | relative">
               <span className="aboutCover | absolute bg-brown bottom-0 h-full w-full"></span>
               <div className="info | flex mb-6 mr-6">
                  <p className="label | flex-none h-12 font-light min-w-[4rem] mr-6 w-min">INFO</p>
                  <div>
                     {item.description}
                  </div>
               </div>
               <div className="info | flex mr-6">
                  <p className="label | flex-none h-12 font-light min-w-[4rem] mr-6 w-min">YOU SHOULD KNOW</p>
                  <div>
                     Each FLOEMA jewel is entirely handmade: any difference from the original picture evidences the unique and artisanal manufacture of the piece.
                  </div>
               </div>
            </div>
            <div className="buttons | my-6 relative">
               <a href="https://www.floemajewelry.com/" className="text-4xl" >Shop It <span className="font-['Suisse']">↗</span></a>
               <Link to={'/collections'}>
                  <button className="block border-[1px] border-light border-solid m-auto mt-14 px-12 py-6 rounded-[100%]">CLOSE</button>
               </Link>
            </div>
         </div>
      </section >
   )
}

export default ItemData