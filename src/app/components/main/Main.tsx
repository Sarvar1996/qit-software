import React, { useEffect } from 'react';
import { useCountriesContext } from '../../contexts/countries.context';


export const Main = () => {
    const { countries, fetchCountries, loading } = useCountriesContext();

    useEffect(() => {
      fetchCountries();
    }, [fetchCountries])
  
    console.log(countries)
  return (
    <section>
      <h1>test</h1>
    </section>
  )
};
