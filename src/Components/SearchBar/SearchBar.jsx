import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from '@mui/material/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import debounce from 'lodash.debounce';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchBar.css';
import logo from '../../assets/logo.png';
import { setData } from '../../features/weather/weatherSlice';
import { useDispatch } from 'react-redux';

const SearchBar = () => {
    const GEOAPIFY = process.env.REACT_APP_GEOAPIFY_KEY;
    const WEATHER = process.env.REACT_APP_OPENWEATHERMAP_KEY;

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [unity, setUnity] = useState('metric')
    const dispatch = useDispatch()

    // ... (debouncedFetchCities and handleInputChange remain the same) ...
    const debouncedFetchCities = useMemo(
        () =>
            debounce((value, callback) => {
                if (!value.trim()) {
                    callback([]);
                    return;
                }

                setLoading(true);
                fetch(
                    `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&limit=10&apiKey=${GEOAPIFY}`
                )
                    .then(resp => {
                        if (!resp.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return resp.json();
                    })
                    .then(json => {
                        const newOptions = json.results ? json.results.map(data => ({
                            lat: data.lat,
                            lon: data.lon,
                            city: data.city,
                            country: data.country,
                            formatted: data.formatted,
                        })) : [];
                        callback(newOptions);
                    })
                    .catch(error => {
                        console.error('Fetching error:', error);
                        callback([]);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }, 300),
        [GEOAPIFY]
    );

    const handleInputChange = useCallback((event) => {
        const value = event.target.value;
        debouncedFetchCities(value, (newOptions) => {
            setOptions(newOptions);
        });
    }, [debouncedFetchCities]);

    const handleCitySelection = (event, newValue) => {
        setSelectedCity(newValue);
        console.log("Selected City Data:", newValue);
    };

    const handleSearchClick = () => {

        // Ensure a city object has been selected AND the key is defined
        if (selectedCity && WEATHER) {
            const { lat, lon, formatted } = selectedCity;
            console.log(`Searching for weather in: ${formatted}`);
            console.log(`Latitude (lat): ${lat}, Longitude (lon): ${lon}`);

            fetch(
                // Use the globally defined WEATHER variable
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unity}&&appid=${WEATHER}`
            )
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Weather API Error: HTTP status ${response.status}`);
                    }
                    return response.json();
                })
                // Inside the handleSearchClick function, update the .then() block:

                // Your weather fetch function (handleSearchClick .then block)
                .then(data => {
                    // Destructure the parts you want to save
                    const { clouds, main, name, sys, weather, wind } = data;

                    // Dispatch the action with the destructured data object
                    dispatch(setData({ clouds, main, name, sys, weather, wind }));
                })


        } else if (!selectedCity) {
            console.log("No city selected.");
        } else {
            // This 'else' block will now only run if selectedCity is truthy, but WEATHER is falsy (undefined/null)
            console.error("WEATHER API Key is missing or invalid in the environment.");
        }
    }

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
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    isOptionEqualToValue={(option, value) => option.formatted === value.formatted}
                    getOptionLabel={(option) => option.formatted}
                    options={options}
                    loading={loading}
                    onChange={handleCitySelection}
                    value={selectedCity}

                    renderInput={(params) => (
                        <TextField
                            {...params}
                            onChange={handleInputChange}
                            placeholder="Select or Enter a city..."
                            variant="outlined"
                            className="custom-search-input"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                    clearOnBlur={false}
                />
            </div>
            <button
                className="btn custom-search-button ms-2"
                type="button"
                aria-label="Search button"
                onClick={handleSearchClick}
                disabled={!selectedCity}
            >
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
};

export default SearchBar;