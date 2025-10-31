
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchBar.css';
import logo from '../../assets/logo.png';

const SearchBar = () => {
    const GEOAPIFY = process.env.REACT_APP_GEOAPIFY_KEY;

    const handlInputChange = (e) => {
        const value = e.currentTarget.value; // just assign the string

        if (!value.trim()) return; // optional: skip empty input

        fetch(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=${GEOAPIFY}`
        )
            .then(resp => resp.json())
            .then(json => console.log(json))
            .catch(err => console.error("Error fetching Geoapify:", err));

        console.log(value); // current input value
    };






    return (
        <div className="search-bar-container d-flex justify-content-center align-items-center p-2">
            <motion.img
                src={logo}
                alt="Logo"
                width="80"
                className="me-3"
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
            <div className="input-group search-input-group w-100">
                <Autocomplete
                    sx={{ width: "80%" }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            onChange={handlInputChange}
                            placeholder="Select or Enter a city..."
                            variant="outlined"
                            className="custom-search-input"
                        />
                    )}
                    options={['casa', 'rabat', 'idia']}
                />
            </div>
            <button
                className="btn custom-search-button ms-2"
                type="button"
                aria-label="Search button"
            >
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
};

export default SearchBar;
