import { useCountriesContext } from '../../contexts/countries.context';
import logo from '../../../assets/arrow.svg';
import Select from 'react-select';

import './Filter.css'

export const FilterPanel = () => {
    const {  
        allCountries, 
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

    const arrowDirection = sortingDirectionASC ? 'arrowIconUp' : 'arrowIconDown';

    const onChange = (selectedOptions: any) => filterByRegion(selectedOptions);

    const onChangeArea = (selectedOptions: any) => filterByArea(selectedOptions);

    return (
            <div className='sortPanel'>
            <button className='sortBtn' onClick={sortByDirection}>
                Sorting by:  <img src={logo} className={arrowDirection} alt="sorting by ascending or descending order"/>
            </button>
            <div className='filtersPanel'>
                <Select 
                    placeholder={'Select region'} 
                    options={regions} 
                    defaultValue={regions[0]}
                    className='selectRegion' 
                    onChange={onChange} />
                <Select 
                    placeholder={'Select area'} 
                    options={countriesOption} 
                    defaultValue={countriesOption[0]}
                    className='selectRegion' 
                    onChange={onChangeArea} />
            </div>
            </div>
    )
};
