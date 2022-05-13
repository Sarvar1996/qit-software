import React, { useEffect } from 'react';
import { useCountriesContext } from '../../contexts/countries.context';
import { Cards } from '../cards/Cards';
import logo from '../../../assets/arrow.svg';
import Select from 'react-select';
import { Pagination } from '../pagination/Pagination';

import './Main.css'

const options = [
    {value: 'All', label:'All'},
    {value: 'Asia', label:'Asia'},
    {value: 'Europe', label:'Europe'},
    {value: 'Africa', label:'Africa'},
    {value: 'Oceania', label:'Oceania'},
    {value: 'Americas', label:'Americas'},
    {value: 'Antarctic', label:'Antarctic'},
]

export const Main = () => {
    const { 
        countries, 
        allCountries, 
        fetchCountries, 
        loading, 
        sortByDirection, 
        sortingDirectionASC, 
        filterByRegion, 
        filterByArea,
        regions
     } = useCountriesContext();

    const  countriesOption = allCountries.map((country) => {return {
        value:country.area,
        label: country.name
            }
        }
    );
    countriesOption.unshift({value: 10000000, label: 'All'})
//   const regionsList: string[] = [];

  useEffect(() => {
     fetchCountries();
  },[])

  if (loading) {
    return (
      <a href="/">Loading countries, please wait…</a>
    );
  }

  const arrowDirection = sortingDirectionASC ? 'arrowIconUp' : 'arrowIconDown';

const onChange = (selectedOptions: any) => filterByRegion(selectedOptions);

const onChangeArea = (selectedOptions: any) => filterByArea(selectedOptions);

  return (
    <section>
        <div className='sortPanel'>
          <button className='sortBtn' onClick={sortByDirection}>
            Sorting by:  <img src={logo} className={arrowDirection} alt="sorting by ascending or descending order"/>
          </button>
          <div className='filtersPanel'>
            <Select 
                placeholder={'Select region'} 
                options={regions} 
                className='selectRegion' 
                onChange={onChange} />
            <Select 
                placeholder={'Select area'} 
                options={countriesOption} 
                className='selectRegion' 
                onChange={onChangeArea} />
          </div>
        </div>
      <Cards />
      <Pagination />
    </section>
  )
};
