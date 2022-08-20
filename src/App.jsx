import React, { createContext, useEffect, useState } from 'react';
import Preloader from './components/Preloader';
import About from './pages/About';
import Collections from './pages/Collections';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Detail from './pages/Detail';
import { useSinglePrismicDocument } from '@prismicio/react';
import './scss/styles.scss'
import './styles.css'

const ProductsContext = createContext();
const AboutContext = createContext();

function App() {

   const [productPage] = useSinglePrismicDocument('collections');
   const [aboutPage] = useSinglePrismicDocument('about')

   // eslint-disable-next-line
   const [resize, setResize] = useState(0)
   const [products, setProducts] = useState(null)
   const [about, setAbout] = useState(null)

   window.onresize = () => {
      setResize(last => last += 1)
   }

   useEffect(() => {

      if(productPage && aboutPage){
         productPage.id && setProducts(productPage);
         aboutPage.id && setAbout(aboutPage)
      }
      
   }, [productPage, aboutPage])

   return (
      <div className="App | bg-brown">
         <Preloader />
         <BrowserRouter>
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
            <div>
            </div>
         </BrowserRouter>
      </div >
   );
}

export { App, ProductsContext, AboutContext };
