import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './Components/SearchBar/SearchBar';
import { Weather } from './Components/Weather/Weather';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <div
      className="mx-auto bg-white shadow rounded"
      style={{ width: "100%" }}
    >
      <SearchBar></SearchBar>
      <Weather></Weather>
    </div>
    
  </React.StrictMode>
);

