import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/';

const getCountry = (text) => {
  const request = axios.get(`${baseUrl}/name/${text}`);
  return request.then(response => response.data);
}

const getAllCountries = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then(response => response.data).catch(error => console.log(error));
}

export default { getCountry, getAllCountries };