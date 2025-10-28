import React from 'react';
import { motion } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchBar.css';
import logo from '../../assets/logo.png'; // ✅ المسار الصحيح من src

// You'll create this file for the custom styles

const SearchBar = () => {
    return (
        // The main container with the custom gradient background
        <div className="search-bar-container d-flex justify-content-center align-items-center p-2 ">
            <motion.img
                src={logo}
                alt="Logo"
                width="80"
                className="me-3"
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            />
            <div className="input-group search-input-group w-100">

                {/* The Search Input Field */}
                <input
                    type="text"
                    className="form-control custom-search-input w-75"
                    placeholder="Search anything...."
                    aria-label="Search input"
                />

                {/* The Search Button */}
                <button
                    className="btn custom-search-button"
                    type="button"
                    aria-label="Search button"
                >
                    {/* Using FontAwesome for the magnifying glass icon */}
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;