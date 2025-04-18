// App.jsx
import React from 'react';
import Weather from './Weather';
import './App.css'

const App = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-700">
      <Weather />
    </div>
  );
};

export default App;