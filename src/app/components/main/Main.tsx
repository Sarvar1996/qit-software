import React, { useEffect } from 'react';
import { useCountriesContext } from '../../contexts/countries.context';
import { Card } from '../cards/Cards';
import logo from '../../../assets/arrow.svg'
import './Main.css'


export const Main = () => {
  const { fetchCountries, loading, sortByDirection, sortingDirectionASC } = useCountriesContext();

  useEffect(() => {
     fetchCountries();
  },[])

  if (loading) {
    return (
      <a href="/" aria-busy="true">Loading countries, please wait…</a>
    );
  }
  const arrowDirection = sortingDirectionASC ? 'arrowIconUp' : 'arrowIconDown'
  return (
    <section>
      <button className='sortBtn' onClick={sortByDirection}>
          Sorting by:  <img src={logo} className={arrowDirection} />
      </button>
      <Card />
    </section>
  )
};
