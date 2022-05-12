import './App.css';
import { Header } from './components/headers/Header';
import { Main } from './components/main/Main';
import { CountriesContextProvider } from './contexts/countries.context';

function App() {

  return (
    <CountriesContextProvider>
      <div className="App">
        <Header />
        <Main />
      </div>
    </CountriesContextProvider>
  );
}

export default App;
