import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './scss/styles.scss'

import { PrismicProvider } from '@prismicio/react'
import { client } from './prismic'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <PrismicProvider client={client}>
         <App />
      </PrismicProvider>
   </React.StrictMode>
);
