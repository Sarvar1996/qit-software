import axios from 'axios';
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { ICountries, IRegion, IArea } from '../interfaces/countries.interface';
import { environment } from '../../environments/environment';

interface IContext {
  countries: ICountries[];
  allCountries: ICountries[];
  fetchCountries: () => void;
  loading: boolean;
  sortByDirection: () => void;
  sortingDirectionASC: boolean
  filterByRegion: (region: IRegion) => void;
  filterByArea: (area: IArea) => void;
  setNextPage: (page: number) => void;
  totalPage: number;
  currentPage: number,
  regions: string[];
}

interface IProps {
  children: ReactNode;
}
const SIZE = 20;
const CountriesContext = createContext<IContext>({} as IContext);

export const useCountriesContext = () => useContext(CountriesContext);

export const CountriesContextProvider: FC<IProps> = ({ children }) => {
  const [countries, setCountries] = useState<ICountries[]>([]);
  const [allCountries, setAllCountries] = useState<ICountries[]>([]);
  const [regions, setRegions] = useState<any[]>([]);
  const [chunkedList, setChunked] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortingDirectionASC, setSortingDirectionASC] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const fetchCountries = () => {
    setLoading(true);
    axios.get(`${environment.API.COUNTRIES_URL}v2/all?fields=name,region,area`)
      .then((data) => {
          setAllCountries(data.data);
          chunkedCountries(data.data);
        })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(()=>{
    const localRegions = new Set(allCountries.map(country => country.region));
    const regionsAsOptions = Array.from(localRegions).map(region => {return {value: region, label: region}});
    setRegions(regionsAsOptions)
  }, [countries])

  const sortByDirection = () => {
    chunkedCountries(chunkedList[currentPage - 1].reverse());
    setSortingDirectionASC(!sortingDirectionASC)
  };

  const chunkedCountries = (array: any) => {
    const chunked = [];
    let index = 0;
    while(index < array.length){
        chunked.push(array.slice(index, index+SIZE))
        index += SIZE
    }
    setChunked(chunked);
    setCountries(chunked[currentPage - 1]);
    setTotalPage(chunked.length)
    return chunked;
}

  const filterByRegion = (region: IRegion) => {
    if(region.value === 'All'){
        chunkedCountries(allCountries)
    }else{
        const filteredRegions = allCountries.filter(country => country.region === region.value);
        chunkedCountries(filteredRegions)
    }
  };
  const filterByArea = (area: IArea) => {
    const filteredAreas = allCountries.filter(country => country.area <= area.value);
    chunkedCountries(filteredAreas);
  };  
  const setNextPage = (page: number) => {
    setCurrentPage(page)
    setCountries(chunkedList[page - 1]);
  };


  const value = {
    countries,
    allCountries,
    fetchCountries,
    loading,
    sortByDirection,
    sortingDirectionASC,
    filterByRegion,
    filterByArea,
    totalPage,
    setNextPage,
    regions,
    currentPage
  };

  return (
    <CountriesContext.Provider value={value}>
      {children}
    </CountriesContext.Provider>
  )
};