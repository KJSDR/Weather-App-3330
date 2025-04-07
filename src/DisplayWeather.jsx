import React from 'react';

const DisplayWeather = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="bg-white rounded-lg border border-white">
      <h2 className="text-xl font-semibold text-blue-800 mb-2">
        Weather for {weatherData.name}
      </h2>
      <div className="grid">
        <div className="flex items-center">
          <div className="mr-2">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
            </svg>
          </div>
          <span className="text-2xl font-bold">{Math.round(weatherData.main.temp)}°F</span>
        </div>
        
        <div className="flex items-center">
          <span className="text-gray-700">Feels like: {Math.round(weatherData.main.feels_like)}°F</span>
        </div>
        
        <div className="flex justify-between mt-2">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500">Min</span>
            <span className="font-medium text-black">{Math.round(weatherData.main.temp_min)}°F</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500">Max</span>
            <span className="font-medium text-black">{Math.round(weatherData.main.temp_max)}°F</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500">Humidity</span>
            <span className="font-medium text-black">{weatherData.main.humidity}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayWeather;