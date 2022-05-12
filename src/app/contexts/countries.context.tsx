import axios from 'axios';
import { createContext, FC, ReactNode, useContext, useState } from 'react';
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
}

interface IProps {
  children: ReactNode;
}

const CountriesContext = createContext<IContext>({} as IContext);

export const useCountriesContext = () => useContext(CountriesContext);

export const CountriesContextProvider: FC<IProps> = ({ children }) => {
  const [countries, setCountries] = useState<ICountries[]>([]);
  const [allCountries, setAllCountries] = useState<ICountries[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortingDirectionASC, setSortingDirectionASC] = useState(true);

  const fetchCountries = () => {
    setLoading(true);
    axios.get(`${environment.API.COUNTRIES_URL}v2/all?fields=name,region,area`)
      .then((data) => {
          setCountries(data.data);
          setAllCountries(data.data);
        })
      .finally(() => {
        setLoading(false);
      });
  };

  const sortByDirection = () => {
    setCountries(countries.reverse());
    setSortingDirectionASC(!sortingDirectionASC)
  };



  const filterByRegion = (region: IRegion) => {
    if(region.value === 'All'){
        setCountries(allCountries)
    }else{
        const filteredRegions = allCountries.filter(country => country.region === region.value);
        setCountries(filteredRegions)
    }
  };
  const filterByArea = (area: IArea) => {
    const filteredAreas = allCountries.filter(country => country.area <= area.value);
    setCountries(filteredAreas);
  };

  const value = {
    countries,
    allCountries,
    fetchCountries,
    loading,
    sortByDirection,
    sortingDirectionASC,
    filterByRegion,
    filterByArea
  };

  return (
    <CountriesContext.Provider value={value}>
      {children}
    </CountriesContext.Provider>
  )
};


//As country list already sorted we can use:
//    setCountries(countries.reverse());

 // Another approach is using sort

    // const sortedCountries = countries.sort((a: any,b:any) => {
    //     if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
    //     if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
    //     return 0;
    // });