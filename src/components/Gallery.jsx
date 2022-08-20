import React from "react"

const Gallery = ({ images }) => {
   return (
      <section className="gallery | h-[56vw] overflow-hidden mb-24 relative w-full">
         <div className="wrapper | absolute left-0 flex">
            {images.map((image, i) => {
               return (
                  <figure key={i} className="flex-none inline-block">
                     <img src={image} alt="floema" className="h-[56vw] object-cover w-[40vw]" />
                  </figure>
               )
            })}
         </div>
      </section>
   )
}

export default Gallery