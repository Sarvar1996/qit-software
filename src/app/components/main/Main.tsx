import React, { useEffect } from 'react';
import { useCountriesContext } from '../../contexts/countries.context';
import { Card } from '../cards/Cards';
import logo from '../../../assets/arrow.svg'
import './Main.css'


export const Main = () => {
  const { fetchCountries, loading, sortByDirection } = useCountriesContext();

  useEffect(() => {
     fetchCountries();
  },[])

  if (loading) {
    return (
      <a href="/" aria-busy="true">Loading countries, please wait…</a>
    );
  }

  return (
    <section>
      <button className='sortBtn' onClick={sortByDirection}>
          Sorting by:  <img src={logo} className='arrowIcon'/>
      </button>
      <Card />
    </section>
  )
};
