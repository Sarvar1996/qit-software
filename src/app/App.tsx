import './App.css';
import { Main } from './components/main/Main';
import { CountriesContextProvider } from './contexts/countries.context';

function App() {


  return (
    <CountriesContextProvider>
      <div className="App">
        <Main />
      </div>
    </CountriesContextProvider>
  );
}

export default App;
