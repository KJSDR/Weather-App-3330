// Weather.jsx
import React, { useState, useEffect, useCallback } from 'react';
import DisplayWeather from './DisplayWeather';
import ForecastWeather from './ForecastWeather';

const Weather = () => {
  const [zipCode, setZipCode] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState('imperial'); // imperial = Fahrenheit, metric = Celsius

  const handleInputChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleUnitsChange = (event) => {
    setUnits(event.target.value);
    // If we already have weather data, refetch with new units
    if (weatherData) {
      if (zipCode) {
        fetchWeatherData(zipCode, event.target.value);
      } else if (weatherData.coord) {
        // We have coordinates from geolocation
        fetchWeatherByCoordinates(weatherData.coord.lat, weatherData.coord.lon, event.target.value);
      }
    }
  };

  const fetchWeatherData = useCallback(async (zip, selectedUnits = units) => {
    const apiKey = import.meta.env.VITE_YOUR_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},US&appid=${apiKey}&units=${selectedUnits}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${zip},US&appid=${apiKey}&units=${selectedUnits}`;

    setLoading(true);
    setError(null);
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(url),
        fetch(forecastUrl)
      ]);
      
      if (weatherResponse.ok && forecastResponse.ok) {
        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();
        setWeatherData(weatherData);
        setForecastData(forecastData);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [units]);

  const fetchWeatherByCoordinates = useCallback(async (lat, lon, selectedUnits = units) => {
    const apiKey = import.meta.env.VITE_YOUR_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${selectedUnits}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${selectedUnits}`;
    
    setLoading(true);
    setError(null);
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl)
      ]);
      
      if (weatherResponse.ok && forecastResponse.ok) {
        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();
        setWeatherData(weatherData);
        setForecastData(forecastData);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [units]);

  const fetchWeatherByLocation = useCallback(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
          setZipCode('');
        },
        (err) => {
          setError("Unable to retrieve your location. " + err.message);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, [fetchWeatherByCoordinates]);

  useEffect(() => {
    if (zipCode.length === 5) {
      fetchWeatherData(zipCode);
    }
  }, [zipCode, fetchWeatherData]);

  // Determine background class based on weather
  const getBackgroundClass = () => {
    if (!weatherData) return "bg-gray-800";
    
    const weatherId = weatherData.weather[0].id;
    const isNight = weatherData.dt > weatherData.sys.sunset || weatherData.dt < weatherData.sys.sunrise;
    
    if (isNight) return "bg-indigo-900";
    if (weatherId >= 200 && weatherId < 300) return "bg-gray-700"; // Thunderstorm
    if (weatherId >= 300 && weatherId < 600) return "bg-gray-600"; // Rain/drizzle
    if (weatherId >= 600 && weatherId < 700) return "bg-blue-100"; // Snow
    if (weatherId >= 700 && weatherId < 800) return "bg-yellow-100"; // Atmosphere
    if (weatherId === 800) return "bg-blue-500"; // Clear
    if (weatherId > 800) return "bg-blue-300"; // Clouds
    
    return "bg-gray-800";
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className={`w-full max-w-lg mx-auto p-6 ${getBackgroundClass()} rounded-lg shadow-lg transition-colors duration-500`}>
        <h1 className="text-2xl font-bold text-center text-white mb-6">Weather App</h1>
        
        {/* Temperature Unit Toggle */}
        <div className="flex justify-center mb-4">
          <div className="bg-white bg-opacity-80 rounded-lg p-2 inline-flex">
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="units"
                value="imperial"
                checked={units === 'imperial'}
                onChange={handleUnitsChange}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-800">°F</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="units"
                value="metric"
                checked={units === 'metric'}
                onChange={handleUnitsChange}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-800">°C</span>
            </label>
          </div>
        </div>
        
        <div className="flex mb-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Enter zip code"
              value={zipCode}
              onChange={handleInputChange}
              pattern="\d{5}"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          <button 
            onClick={fetchWeatherByLocation}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </button>
        </div>
        
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
        
        {weatherData && <DisplayWeather weatherData={weatherData} units={units} />}
        {forecastData && <ForecastWeather forecastData={forecastData} units={units} />}
      </div>
    </div>
  );
};

export default Weather;