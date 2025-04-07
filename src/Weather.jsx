import React, { useState, useEffect } from 'react';
import DisplayWeather from './DisplayWeather';

const Weather = () => {
  const [zipCode, setZipCode] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setZipCode(event.target.value);
  };

  const fetchWeatherData = async (zip) => {
    const apiKey = import.meta.env.VITE_YOUR_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},US&appid=${apiKey}&units=imperial`;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (zipCode.length === 5) {
      fetchWeatherData(zipCode);
    }
  }, [zipCode]);

  return (
    <div>
      <h1>Weather App</h1>
      <form>
        <input
          type="text"
          placeholder="Enter zip code"
          value={zipCode}
          onChange={handleInputChange}
          pattern="\d{5}"
          required
        />
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weatherData && <DisplayWeather weatherData={weatherData} />}
    </div>
  );
};

export default Weather;
