import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ItemData from "../components/ItemData";
import { ProductsContext } from "../App";
import gsap from "gsap";

const Detail = () => {

   const { collection, name } = useParams();

   const doc = useContext(ProductsContext);
   const [item, setItem] = useState();

   const NotFoundScreen = ({ error }) => (
      <section className="errorPage">
         Error 404: {error}
      </section>
   )

   gsap.fromTo('.detailsContainer', { opacity: 0 }, { duration: .1, opacity: 1 })

   useEffect(() => {

      try {
         const coll = doc.data.body.find(coll => coll.primary.name.toLowerCase() === collection);
         if (!coll) {
            setItem(<NotFoundScreen error={"collection not found."} />)

         } else {
            const item = coll.items.find(item => item.name.toLowerCase() === name)

            setItem(item ? <ItemData item={item} /> : <NotFoundScreen error={"element not found."} />)
         }
      } catch (error) {
         console.log('Still loading... c:');
      }

      // eslint-disable-next-line
   }, [doc])

   return (
      <div className=" bg-brown">
         <div className="detailsContainer">
            {item}
         </div>
      </div>
   )
}

export default Detail