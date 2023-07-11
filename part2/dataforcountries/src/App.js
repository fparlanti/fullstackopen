import { useState, useEffect } from 'react';
import countriesService from './services/countries';

const DisplayResult = ({ countries }) => {

  if (countries === null) return null;

  return (
    <div>

    </div>
  );
}

function App() {
  const [allCountries, setAllCountries] = useState(null);
  const [search, setSearch] = useState(null)

  useEffect(() => {
    countriesService
      .getAllCountries()
      .then(response =>
        setAllCountries(response)
      )
  }, []);

  useEffect(() => {
    let text = search;
    if (text !== null && text !== '') {
      text = text.toLowerCase();
      const query = allCountries.filter(country => country.name.common.toLowerCase().includes(text) || country.name.official.toLowerCase().includes(text));
      console.log(query.length);
      if (query.length > 10) {
        
      }
    }
  }, [search]);

  const handlerTextChanged = (event) => {
    const text = event.target.value;
    setSearch(text);
  }

  return (
    <div>
      <div>
        find countries <input onChange={handlerTextChanged}></input>
      </div>

      <DisplayResult countries={allCountries} />

    </div>
  );
}

export default App;
