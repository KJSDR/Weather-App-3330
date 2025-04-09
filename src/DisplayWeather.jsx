// DisplayWeather.jsx
import React from 'react';

const DisplayWeather = ({ weatherData }) => {
  if (!weatherData) return null;

  // Function to format time from Unix timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Weather icon URL
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-800">
          {weatherData.name}, {weatherData.sys.country}
        </h2>
        <div className="flex items-center">
          <img src={iconUrl} alt={weatherData.weather[0].description} className="w-16 h-16" />
          <span className="text-3xl font-bold text-black">{Math.round(weatherData.main.temp)}°F</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-lg capitalize text-blue-600">{weatherData.weather[0].description}</p>
        <p className="text-gray-700">Feels like: {Math.round(weatherData.main.feels_like)}°F</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Temperature</h3>
          <div className="flex justify-between mt-1">
            <div>
              <span className="text-sm text-gray-500">Min</span>
              <p className="font-medium text-black">{Math.round(weatherData.main.temp_min)}°F</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Max</span>
              <p className="font-medium text-black">{Math.round(weatherData.main.temp_max)}°F</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Wind</h3>
          <div className="mt-1">
            <p className="font-medium">{Math.round(weatherData.wind.speed)} mph</p>
            <p className="text-sm text-black">Direction: {weatherData.wind.deg}°</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <span className="text-sm text-gray-500">Humidity</span>
          <p className="font-medium text-black">{weatherData.main.humidity}%</p>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <span className="text-sm text-gray-500">Pressure</span>
          <p className="font-medium text-black">{weatherData.main.pressure} hPa</p>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <span className="text-sm text-gray-500">Visibility</span>
          <p className="font-medium text-black">{(weatherData.visibility / 1609).toFixed(1)} mi</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
        <div>
          <span className="text-sm text-gray-500">Sunrise</span>
          <p className="font-medium text-black">{formatTime(weatherData.sys.sunrise)}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Sunset</span>
          <p className="font-medium text-black">{formatTime(weatherData.sys.sunset)}</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayWeather;