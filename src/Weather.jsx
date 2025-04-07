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
    <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Weather App</h1>
      <form className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter zip code"
            value={zipCode}
            onChange={handleInputChange}
            pattern="\d{5}"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </form>
      
      {loading && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          <span className="font-medium">Error:</span> {error}
        </div>
      )}
      
      {weatherData && <DisplayWeather weatherData={weatherData} />}
    </div>
  );
};

export default Weather;