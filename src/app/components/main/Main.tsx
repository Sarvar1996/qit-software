import { useEffect } from 'react';
import { useCountriesContext } from '../../contexts/countries.context';
import { Cards } from '../cards/Cards';
import { Pagination } from '../pagination/Pagination';

import './Main.css'
import { FilterPanel } from '../filter/Filter';
export const Main = () => {
    const {  
        allCountries, 
        fetchCountries, 
        loading,
     } = useCountriesContext();

    const  countriesOption = allCountries.map((country) => {return {
        value:country.area,
        label: country.name
            }
        }
    );
    countriesOption.unshift({value: 10000000, label: 'All'})

  useEffect(() => {
     fetchCountries();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if (loading) {
    return (
      <a href="/">Loading countries, please wait…</a>
    );
  }

  return (
    <section>
      <FilterPanel />
      <Cards />
      <Pagination />
    </section>
  )
};
