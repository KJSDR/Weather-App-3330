import React from 'react';

const DisplayWeather = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div>
      <h2>Weather for {weatherData.name}</h2>
      <p>Temperature: {weatherData.main.temp}°F</p>
    </div>
  );
};

export default DisplayWeather;
