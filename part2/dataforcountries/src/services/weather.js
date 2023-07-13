import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const getWeatherData = (city, country) => {
  const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api_key}`);
  return request.then(response => response.data);
}

export default {getWeatherData};