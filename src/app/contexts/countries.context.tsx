import axios from 'axios';
import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { ICountries } from '../interfaces/countries.interface';
import { environment } from '../../environments/environment';

interface IContext {
  countries: ICountries[];
  fetchCountries: () => void;
  loading: boolean;
  sortByDirection: () => void;
}

interface IProps {
  children: ReactNode;
}

const CountriesContext = createContext<IContext>({} as IContext);

export const useCountriesContext = () => useContext(CountriesContext);

export const CountriesContextProvider: FC<IProps> = ({ children }) => {
  const [countries, setCountries] = useState<ICountries[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortingDirection, setSortingDirection] = useState(true);

  const fetchCountries = () => {
    setLoading(true);
    axios.get(`${environment.API.COUNTRIES_URL}v2/all?fields=name,region,area`)
      .then((data) => setCountries(data.data))
      .finally(() => {
        setLoading(false);
      });
  };

  const sortByDirection = () => {
    setLoading(true);
    axios.get(`${environment.API.COUNTRIES_URL}v2/all?fields=name,region,area`)
      .then((data) => setCountries(data.data))
      .finally(() => {
        setLoading(false);
      });
  };

  const value = {
    countries,
    fetchCountries,
    loading,
    sortByDirection
  };

  return (
    <CountriesContext.Provider value={value}>
      {children}
    </CountriesContext.Provider>
  )
};
