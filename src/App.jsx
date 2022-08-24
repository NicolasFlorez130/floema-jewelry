import React, { createContext, useEffect, useState } from 'react';
import Preloader from './components/Preloader';
import About from './pages/About';
import Collections from './pages/Collections';
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Detail from './pages/Detail';
import { useSinglePrismicDocument } from '@prismicio/react';
import logo from '/logo.svg'

const ProductsContext = createContext();
const AboutContext = createContext();
const HomeContext = createContext();

function App() {

   const [productPage] = useSinglePrismicDocument('collections');
   const [aboutPage] = useSinglePrismicDocument('about')
   const [homePage] = useSinglePrismicDocument('home')

   const [products, setProducts] = useState(null)
   const [about, setAbout] = useState(null)
   const [home, setHome] = useState(null)

   useEffect(() => {

      if (homePage && productPage && aboutPage) {
         homePage.id && setHome(homePage)
         productPage.id && setProducts(productPage);
         aboutPage.id && setAbout(aboutPage)
      }

   }, [homePage, productPage, aboutPage])

   return (
      <div className="App | font-light">
         <ProductsContext.Provider value={products}>
            <Preloader />
            <HashRouter>
               <Routes>
                  <Route path='/' element={
                     <AboutContext.Provider value={about}>
                        <HomeContext.Provider value={home}>
                           <Home />
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
         </ProductsContext.Provider>
      </div >
   );
}

export { App, ProductsContext, AboutContext, HomeContext };
