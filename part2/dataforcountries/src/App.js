import { useState, useEffect } from 'react';
import countriesService from './services/countries';
import weatherService from './services/weather'


const Weather = ({ capital, weather }) => {
  if (weather !== null) {
    const tempCelsius = weather.main.temp - 273.15;
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>temperature {(Math.round(tempCelsius * 100) / 100).toFixed(2)} Celsius</p>
        <img src={'https://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'} />
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    )
  }
}

const DisplayList = ({ countries, handler }) => {

  return (
    <div>
      {countries.map(country => {
        return <span key={country.cca3}>{country.name.common}<button onClick={() => handler(country)}>show</button><br /></span>
      })}
    </div>
  );
}

const DisplayDetails = ({ country, weather }) => {

  return (
    <div>
      <h1>{country.name.common}</h1>
      <span>capital {country.capital[0]}<br /></span>
      <span>area {country.area}<br /></span>
      <h2>languages:</h2>
      <ul>
        {Object.keys(country.languages).map(language => <li key={language}>{country.languages[language]}</li>)}
      </ul>
      <img src={country.flags.png} />
      <Weather capital={country.capital[0]} weather={weather} />
    </div>
  );
}

const DisplayResults = ({ countries, handler, weather }) => {

  if (countries === null || countries === undefined) return null;
  if (countries.length > 10) return (<div>Too many matches, specify another filter</div>);
  if (countries.length == 0) return (<div>No matches, specify another filter</div>);
  if (countries.length > 1 && countries.length <= 10) {
    return (
      <div>
        <DisplayList countries={countries} handler={handler} />
      </div>
    );
  } else {
    return (
      <div>
        <DisplayDetails country={countries} weather={weather} />
      </div>
    );
  }
}

const App = () => {
  const [allCountries, setAllCountries] = useState(null);
  const [search, setSearch] = useState(null)
  const [displayCountries, setDisplayCountries] = useState(null)
  const [singleCountryDetails, setSingleCountryDetails] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    countriesService
      .getAllCountries()
      .then(response => {
        setAllCountries(response);
      })
  }, []);

  useEffect(() => {
    let text = search;
    if (text !== null && text !== '' && text !== undefined) {
      text = text.toLowerCase();
      const query = allCountries.filter(country => country.name.common.toLowerCase().includes(text) || country.name.official.toLowerCase().includes(text));
      setSingleCountryDetails(null)
      setWeatherData(null)
      if (query.length == 1) {
        countriesService
          .getCountry(query[0].name.common)
          .then(country => {
            setDisplayCountries(country);
            weatherService
              .getWeatherData(country.capital[0], country.cca2)
              .then(data => {
                setWeatherData(data);
              })
          })
          .catch(error => setDisplayCountries(null))
      } else {
        setDisplayCountries(query)
      }
    }
  }, [search]);

  const handlerTextChanged = (event) => {
    const text = event.target.value;
    setSearch(text);
  }


  const handlerShowCountryDetails = (country) => {
    weatherService
      .getWeatherData(country.capital[0], country.cca2)
      .then(data => {
        setWeatherData(data);
        setSingleCountryDetails(country);
      })
  }

  if (singleCountryDetails !== null && weatherData !== null) {
    return (
      <div>
        <div>
          find countries <input onChange={handlerTextChanged}></input>
        </div>

        <DisplayResults countries={displayCountries} handler={handlerShowCountryDetails} weather={weatherData} />

        <DisplayDetails country={singleCountryDetails} weather={weatherData} />

      </div >
    );
  } else {
    return (
      <div>
        <div>
          find countries <input onChange={handlerTextChanged}></input>
        </div>

        <DisplayResults countries={displayCountries} handler={handlerShowCountryDetails} weather={weatherData} />

      </div>
    );
  }
}

export default App;
