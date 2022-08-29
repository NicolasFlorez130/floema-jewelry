import React, { forwardRef } from 'react';

const CollectionsTitle = ({ collections = [], opacity = false, styles = '' }, ref) => {
   return (
      <div
         ref={ref}
         className={
            'collectionTitles | absolute cursor-default text-light w-full z-10 bottom-0 ' + styles
         }>
         {[...collections].reverse().map((collection, i) => {
            return (
               <div key={i} className={opacity ? 'opacity-60' : ''}>
                  <p className="label py-8 text-xl text-center">
                     Collection <br />{' '}
                     {i === 0 ? 'Four' : i === 1 ? 'Three' : i === 2 ? 'Two' : 'One'}
                  </p>
                  <h2 className="[writing-mode:vertical-rl] mx-auto relative rotate-180 text-9xl">
                     <span className="relative">{collection.primary.name}</span>
                  </h2>
               </div>
            );
         })}
      </div>
   );
};

export default forwardRef(CollectionsTitle);
