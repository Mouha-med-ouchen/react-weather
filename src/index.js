import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';

import SearchBar from './Components/SearchBar/SearchBar';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <div
      className="mx-auto my-5 p-4 bg-white shadow rounded"
      style={{ width: "80%" }}
    >
      <SearchBar></SearchBar>
    </div>
    
  </React.StrictMode>
);

