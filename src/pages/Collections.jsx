import { useEffect, useState, useRef, useContext, useMemo } from 'react';
import CollectionsTitle from '../components/CollectionsTitle';
import Collection from '../components/Collection';
import { gsap } from 'gsap';
import { ScrollTrigger as scrollTrigger } from 'gsap/ScrollTrigger';
import { ProductsContext } from '../App';
import Nav from './../components/Nav';
import useScrollSmooth from '../hooks/useScrollSmooth';

let collectionsAux = 0;

sessionStorage.getItem('position') === null && sessionStorage.setItem('position', 0);

window.scrollTo(0, window.offsetHeight);

gsap.registerPlugin(scrollTrigger);

const Collections = () => {
   const doc = useContext(ProductsContext);

   const [collections, setCollections] = useState(() => []);
   const [title, setTitle] = useState({});

   const sliderWrapper = useRef();
   const wrapper = useRef();
   const gallery = useRef();
   const bgTitles = useRef();

   useEffect(() => {
      doc?.data && setCollections(doc.data.body);

      if (collections.length <= 0) {
         collectionsAux++;
      }
   }, [doc, collectionsAux]);

   useEffect(() => {
      if (collections.length <= 0) return;

      const height = bgTitles.current.offsetHeight - gallery.current.offsetHeight;
      const width = wrapper.current.offsetWidth - gallery.current.offsetWidth;

      //scroll settings
      const wrapperScroll = useScrollSmooth(
         document.querySelector('.collections > .wrapper'),
         'xy',
         'x',
         () => {
            wrapperScroll.scrollTop > 0 &&
               sessionStorage.setItem('position', wrapperScroll.scrollTop);
         }
      );
      wrapperScroll.setPosition(0, sessionStorage.getItem('position'));

      //gsap settings

      const scrollConfig = {
         trigger: gallery.current,
         scroller: '.collections > .wrapper',
         start: `bottom bottom`,
         end: `${width * 0.8} top`,
         scrub: true,
         pin: true,
      };

      gsap.to('.collectionTitles', { scrollTrigger: scrollConfig, y: height, ease: 'none' });

      const horizontalScroll = gsap.to(wrapper.current, {
         scrollTrigger: scrollConfig,
         x: -width,
         ease: 'none',
      });

      let auxNum = '1';
      gsap.utils.toArray('.collections .card').forEach(card => {
         const v1 = 15,
            v2 = 5,
            t = 40;

         const placement =
            auxNum === '1'
               ? v1
               : auxNum === '2>' || auxNum === '>2'
               ? v2
               : auxNum === '3>' || auxNum === '>3'
               ? -v2
               : -v1;

         gsap.to(card, { duration: 0, opacity: 0.5, y: `${placement}vh` });

         const tl = gsap.timeline({ repeat: -1 });
         gsap.defaults({ ease: 'none' });

         switch (placement) {
            case v1:
               tl.to(card, { duration: t, y: `-${v1}vh` });
               tl.to(card, { duration: t, y: `${v1}vh` });
               break;
            case v2:
               tl.to(card, { duration: t / 4, y: `${v1}vh` });
               tl.to(card, { duration: t, y: `-${v1}vh` });
               tl.to(card, { duration: (t / 4) * 3, y: `${v2}vh` });
               break;
            case -v2:
               tl.to(card, { duration: (t / 4) * 3, y: `${v1}vh` });
               tl.to(card, { duration: t, y: `-${v1}vh` });
               tl.to(card, { duration: t / 4, y: `-${v2}vh` });
               break;
            default:
               tl.to(card, { duration: t, y: `${v1}vh` });
               tl.to(card, { duration: t, y: `-${v1}vh` });
               break;
         }

         const degs = Math.sign(placement) > 0 ? 20 + placement : -20 + placement;

         gsap.fromTo(
            card,
            { rotate: -degs },
            {
               rotate: degs,
               scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalScroll,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
               },
            }
         );

         gsap.to(card, {
            scrollTrigger: {
               trigger: card,
               containerAnimation: horizontalScroll,
               start: '40% center',
               end: '60% center',
               toggleActions: 'restart reverse restart reverse',
            },
            duration: 0.2,
            opacity: 1,
            cursor: 'pointer',
         });

         auxNum =
            auxNum === '1'
               ? '>2'
               : auxNum === '>2'
               ? '>3'
               : auxNum === '>3'
               ? '4'
               : auxNum === '4'
               ? '3>'
               : auxNum === '3>'
               ? '2>'
               : '1';
      });

      gsap.utils.toArray('.collections .collection').forEach((collection, i) => {
         function changeTitle() {
            setTitle({
               h1: collection.id,
               h2: `${
                  i === 0 ? 'First' : i === 1 ? 'Second' : i === 2 ? 'Third' : 'Fourth'
               } Collection`,
               p: collections[i]?.primary.description,
            });

            gsap.to('.collections .cover', { duration: 0.3, height: 0 });
         }

         function hideTitle() {
            gsap.to('.collections .cover', { duration: 0.3, height: '100%' });
         }

         gsap.to(collection, {
            scrollTrigger: {
               trigger: collection,
               containerAnimation: horizontalScroll,
               start: 'top center',
               end: 'bottom 60%',
               onEnter: () => changeTitle(),
               onLeave: () => hideTitle(),
               onEnterBack: () => changeTitle(),
               onLeaveBack: () => hideTitle(),
            },
         });
      });
   }, [collections]);

   return (
      <section className="collections | h-full relative">
         <Nav buttonValue={'About'} color={'text-light'} />
         <div ref={sliderWrapper} className="wrapper | h-[100vh]">
            <div ref={gallery} className="collectionGallery | bg-brown overflow-hidden w-auto">
               <CollectionsTitle ref={bgTitles} collections={collections} opacity={true} />
               <div className="title | absolute bottom-0 m-6 text-light">
                  <h2
                     className="overflow-hidden text-xl relative whitespace-nowrap
                  xl:hidden">
                     {title.h2}
                     <span className="cover | absolute bg-brown bottom-0 left-0 w-full"></span>
                  </h2>
                  <h1 className="overflow-hidden text-8xl relative whitespace-nowrap">
                     {title.h1}
                     <span className="cover | absolute bg-brown bottom-0 left-0 w-full"></span>
                  </h1>
                  <p
                     className="hidden mt-2 max-w-[600px] text-xs w-[40vw]
                  xl:block">
                     {title.p}
                     <span className="cover | absolute bg-brown bottom-0 left-0 w-full"></span>
                  </p>
               </div>
               <div
                  ref={wrapper}
                  className="wrapper | flex h-[100vh] overflow-visible px-[10vw] relative w-max z-20
                  sm:px-[20vw] | lg:px-[40vw]">
                  {collections.map((collection, i) => (
                     <Collection
                        array={collection}
                        index={i}
                        setTitle={setTitle}
                        key={'collection ' + i}
                     />
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
};

export default Collections;
