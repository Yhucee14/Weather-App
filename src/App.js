import './App.css';
import { WEATHER_API_KEY, WEATHER_API_URL } from './components/api';
import Currentweather from './components/current-weather/Currentweather';
import Search from './components/Search/search';
import {useState} from 'react';
import Forecast from './components/forecast/forecast';

function App() {
  const [CurrentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);



  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const CurrentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

  const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

  Promise.all([CurrentWeatherFetch, forecastFetch])
  .then(async (response) => {
    const weatherResponse = await  response[0].json();
    const forecastResponse = await  response[1].json();

    setCurrentWeather({city: searchData.label , ...weatherResponse});
    setForecast({city: searchData.label , ...forecastResponse});
  })
  .catch((err) => console.log(err));

}


console.log(forecast);



  return (
    <div className="App-con">
      <Search onSearchChange={handleOnSearchChange} />
      {CurrentWeather && <Currentweather data={CurrentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
