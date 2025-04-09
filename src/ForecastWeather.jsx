// ForecastWeather.jsx
import React from 'react';

const ForecastWeather = ({ forecastData }) => {
  if (!forecastData) return null;

  // Group forecast by day and get one forecast per day (noon)
  const getDailyForecasts = () => {
    const dailyData = {};
    
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      const hour = new Date(item.dt * 1000).getHours();
      
      // Get forecast around noon for each day
      if (!dailyData[date] || Math.abs(hour - 12) < Math.abs(new Date(dailyData[date].dt * 1000).getHours() - 12)) {
        dailyData[date] = item;
      }
    });
    
    return Object.values(dailyData).slice(0, 5); // Return the first 5 days
  };

  const formatDay = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'short' });
  };

  const dailyForecasts = getDailyForecasts();

  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg p-4">
      <h3 className="text-xl font-semibold text-blue-800 mb-3">5-Day Forecast</h3>
      <div className="grid grid-cols-5 gap-2">
        {dailyForecasts.map((forecast, index) => (
          <div key={index} className="flex flex-col items-center p-2 rounded-lg hover:bg-blue-50 transition">
            <p className="font-medium">{formatDay(forecast.dt)}</p>
            <img 
              src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} 
              alt={forecast.weather[0].description} 
              className="w-10 h-10" 
            />
            <p className="font-bold">{Math.round(forecast.main.temp)}°F</p>
            <p className="text-xs text-gray-500 text-center capitalize">{forecast.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastWeather;