import React, { createContext, useEffect, useState } from 'react';
import Preloader from './components/Preloader';
import About from './pages/About';
import Collections from './pages/Collections';
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Detail from './pages/Detail';
import { useSinglePrismicDocument } from '@prismicio/react';
import { Transition } from './components/Transition';

const ProductsContext = createContext();
const AboutContext = createContext();
const HomeContext = createContext();
const ColorContext = createContext();

function App() {

   const [productPage] = useSinglePrismicDocument('collections');
   const [aboutPage] = useSinglePrismicDocument('about')
   const [homePage] = useSinglePrismicDocument('home')

   const [products, setProducts] = useState(null)
   const [about, setAbout] = useState(null)
   const [home, setHome] = useState(null)

   const [color, setColor] = useState(() => 'text-brown')
   const [resize, setResize] = useState(() => 0)

   useEffect(() => {

      if (homePage || productPage || aboutPage) {
         homePage?.id && setHome(homePage)
         productPage?.id && setProducts(productPage);
         aboutPage?.id && setAbout(aboutPage)
      }

   }, [homePage, productPage, aboutPage])

   const [charged, setCharged] = useState(() => false)

   return (
      <div className="App | font-light">
         <ProductsContext.Provider value={products}>
            <ColorContext.Provider value={setColor}>
               <Preloader charged={setCharged} />
               <Transition color={color} />
               <HashRouter>
                  <Routes>
                     <Route path='/' element={
                        <AboutContext.Provider value={about}>
                           <HomeContext.Provider value={home}>
                              <Home charged={charged} />
                           </HomeContext.Provider>
                        </AboutContext.Provider>
                     } />
                  </Routes>
                  <Routes>
                     <Route path='/collections' element={<Collections />} />
                  </Routes>
                  <Routes>
                     <Route path='/details/:collection/:name' element={<Detail />} />
                  </Routes>
                  <Routes>
                     <Route path='/about' element={
                        <AboutContext.Provider value={about}>
                           <About />
                        </AboutContext.Provider>
                     } />
                  </Routes>
               </HashRouter>
            </ColorContext.Provider>
         </ProductsContext.Provider>
      </div >
   );
}

export { App, ProductsContext, AboutContext, HomeContext, ColorContext };
