import React, { useContext, useEffect, useRef, useState } from "react"
import { AboutContext } from "../App";
import Gallery from "../components/Gallery"
import Data from "./../components/Data";
import Highlight from "./../components/Highlight";
import Scrollbar from 'smooth-scrollbar';

let aux = 0;

const About = () => {

   const [pageContent, setContent] = useState([]);
   const [elements, setElements] = useState({
      gallery1: [],
      gallery2: [],
      data1: {
         label: "ABOUT ME",
         text: [
            "Valentina’s work plays around the surprise of what is possible to make with a simple and thin line: a thread.",
            "Coming from a family with a strong feminine tailoring tradition, she wanted to bring this passionate root into her jewellery world, finding new ways of working with textiles.",
            "She weaves freely thousands of meters of threads on a hydrosoluble fabric, cutting or interlacing them one with the other, to let unexpected connections appear.",
            "Her approach is both experimental and traditional: she likes to combine contemporary methods with ancient techniques, like Filigree.",
            "The latest work was chosen by the “Triennale Design Museum” in Milan to be part of the exhibition “W. Women in Italian design” (April 2016- February 2017)."
         ],
         image: ''
      }, data2: {
         label: "THE BRAND",
         text: [
            "FLOEMA is a new jewelry brand all design and handmade by me, Valentina Caprini, goldsmith, and artist based in Florence.",
            "The name FLOEMA is inspired by the vascular tissue of the plants, which brings the lifeblood from the roots to the branches and makes flowers and fruits bloom.",
            "Each FLOEMA piece is elegant and unique, created with a refined goldsmith’s technique in a small laboratory equipped with machines dated to the beginning of the ‘900.",
            "Like the lifeblood makes the plant evolve, so FLOEMA gives part of its income to PLAN INTERNATIONAL, a charity that works hard to eliminate the child brides phenomenon."
         ],
         image: ''
      }, data3: {
         label: "JEWELRY CARE",
         text: [
            "All FLOEMA jewels are exclusively realized using precious metals: 925 silver (pure for the Filigree) and 18kt gold. All metals are subjected to a natural oxidation process, that depends either on natural factors like oxygen in the air, the salt in the sea, sunlight, skin ph, or on chemical factors, like creams and perfumes.",
            "Please find two ways to clean gold and silver with natural ingredients, To make your piece return to its original condition: Gold is slightly subjected to the oxidation process. To make your jewel shine again put your jewels in a solution of half cup of white vinegar and salt for at least 30 minutes. With a white cotton soft cloth dipped in the solution first brush your piece and then rinse it with plenty of water and voila!",
            "To take the oxidation off silver you have to use one ingredient only: bicarbonate. Pour 250ml of lukewarm water and 5 spoons of bicarbonate in a container. Mixed until it is melted. Leave your silver jewels in the solution over the night, then brush them with a toothbrush until they shine again. Finally, rinse and dry with soft cloth."
         ],
         image: ''
      }, data4: {
         label: "SUSTAINABILITY",
         text: [
            "FLOEMA engages in its own small way to choose green solutions as much as possible.",
            "You will receive each piece in a handmade box realized by Florentine typography using eco-friendly paper (made by 90% of pure cellulose and 10% by cotton fibers), in a recycled and 100% recyclable parcel.",
            "The business cards are realized with recycled cotton fiber cardboard.",
            "All the pieces are created in a small laboratory in the Florentine countryside, preferring using green materials and recycling precious materials."
         ],
         image: ''
      }, highlight1: {
         title: "Floema",
         image_1: '',
         image_2: '',
      }, highlight2: {
         title: "Instagram",
         image_1: '',
         image_2: '',
      }
   })

   const doc = useContext(AboutContext);

   useEffect(() => {

      if (!doc) { return }

      setContent(doc.data.body)

      if (pageContent.length < 1) {
         aux++;
         return;
      }

      //Content settings
      {
         const auxObj = elements;

         const arrayAux1 = [];
         pageContent[0].items.forEach(photo => {
            arrayAux1.push(photo.poster.url)
         });
         auxObj.gallery1 = arrayAux1;

         auxObj.data1.image = pageContent[1].primary.image.url;

         auxObj.highlight1.image_1 = pageContent[2].primary.first_image.url
         auxObj.highlight1.image_2 = pageContent[2].primary.second_image.url

         auxObj.data2.image = pageContent[3].primary.image.url

         const arrayAux2 = [];
         pageContent[4].items.forEach(poster => {
            arrayAux2.push(poster.poster.url)
         });
         auxObj.gallery2 = arrayAux2;

         auxObj.data3.image = pageContent[5].primary.image.url

         auxObj.data4.image = pageContent[6].primary.image.url

         auxObj.highlight2.image_1 = pageContent[7].primary.first_image.url
         auxObj.highlight2.image_2 = pageContent[7].primary.second_image.url

         setElements(auxObj);
      }

      Scrollbar.init(document.querySelector('.about > .wrapper'), { smooth: true })


      // eslint-disable-next-line  
   }, [doc, aux])

   return (
      <section className="about | bg-gray">
         <div className="wrapper | py-24 h-[100vh]">
            <Gallery images={elements.gallery1} />

            <h1 className=" px-6 text-6xl text-center">Creating new dialogues <br />
               between threads and metal.</h1>

            <Data info={elements.data1} />

            <Highlight info={elements.highlight1} />

            <Data info={elements.data2} />

            <Gallery images={elements.gallery2} />

            <h2>The surprise of what is possible <br />
               tho create from a single,
               thin thread.</h2>

            <Data info={elements.data3} reversed={true} />

            <Data info={elements.data4} />

            <Highlight info={elements.highlight2} />
         </div>
      </section>
   )
}

export default About