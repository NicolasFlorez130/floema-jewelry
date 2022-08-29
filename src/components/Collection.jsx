import { React } from 'react';
import Card from './Card';

const Collection = ({ array }) => {
   return (
      <div id={array.primary.name} className="collection | flex flex-none items-center">
         {array.items.map((item, i) => (
            <Card item={item} key={'card ' + i} />
         ))}
      </div>
   );
};

export default Collection;
