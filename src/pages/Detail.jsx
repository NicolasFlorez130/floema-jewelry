import React, { useContext, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import ItemData from "../components/ItemData";
import { ProductsContext } from "../App";

const Detail = () => {

   const { collection, name } = useParams();

   const doc = useContext(useMemo(() => ProductsContext));
   const [screen, setScreen] = useState();
   const [item, setItem] = useState(() => null);

   const NotFoundScreen = ({ error }) => (
      <section className="errorPage">
         Error 404: {error}
      </section>
   )

   useEffect(() => {

      if (!doc) return;

      const col = doc?.data.body.find(coll => coll.primary.name.toLowerCase() === collection),
         result = col?.items.find(item_ => item_.name.toLowerCase() === name)

      setItem(result);

   }, [doc])

   useEffect(() => {

      if (item === null) return;

      setScreen(item ? <ItemData item={item} /> : <NotFoundScreen error={"element not found."} />)

   }, [item])

   return (
      <div className=" bg-brown">
         <div className="detailsContainer">
            {screen}
         </div>
      </div>
   )
}

export default Detail