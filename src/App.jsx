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

function App() {

   const [productPage] = useSinglePrismicDocument('collections');
   const [aboutPage] = useSinglePrismicDocument('about')

   const [products, setProducts] = useState(null)
   const [about, setAbout] = useState(null)

   useEffect(() => {

      if (productPage && aboutPage) {
         productPage.id && setProducts(productPage);
         aboutPage.id && setAbout(aboutPage)
      }

   }, [productPage, aboutPage])

   return (
      <div className="App | font-light">
         <nav className="fixed flex justify-between p-6 top-0 w-full z-10">
            <img src={logo} className="w-2/5" alt="Floema logo" />
            <div>Button placeholder</div>
         </nav>
         <Preloader />
         <HashRouter>
            <Routes>
               <Route path='/' element={<Home />} />
            </Routes>
            <Routes>
               <Route path='/collections' element={
                  <ProductsContext.Provider value={products}>
                     <Collections />
                  </ProductsContext.Provider>
               } />
            </Routes>
            <Routes>
               <Route path='/details/:collection/:name' element={
                  <ProductsContext.Provider value={products}>
                     <Detail />
                  </ProductsContext.Provider>
               } />
            </Routes>
            <Routes>
               <Route path='/about' element={
                  <AboutContext.Provider value={about}>
                     <About />
                  </AboutContext.Provider>
               } />
            </Routes>
         </HashRouter>
      </div >
   );
}

export { App, ProductsContext, AboutContext };
