import { useCountriesContext } from '../../contexts/countries.context';
import './Pagination.css';

export const Pagination = () => {
 const { totalPage, setNextPage, currentPage } = useCountriesContext();

  return (
    <div className='pagination'>
      {[...Array(totalPage)].map((e, i) => <button className={currentPage === i + 1 ? 'active' : ''} key={i} onClick={()=>setNextPage(i+1)}>{i+1}</button>)}
    </div>
  )
};
