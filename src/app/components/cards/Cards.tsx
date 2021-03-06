import { useCountriesContext } from '../../contexts/countries.context';
import './Cards.css'

export const Cards = () => {
 const { countries } = useCountriesContext();

 const displayCard = countries.map((data, index) => <div key={index} className='card'>
        <div>
          <span>Country: </span>
          <span>{data.name}</span>
        </div>
        <div>
          <span>Region: </span>
          <span>{data.region}</span>
        </div>
        <div>
          <span>Area: </span>
          <span>{data.area} </span>
        </div>
     </div>)

  return (
    <>
      {displayCard}
    </>
  )
};
