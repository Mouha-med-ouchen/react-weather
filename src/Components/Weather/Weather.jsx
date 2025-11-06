import React, { useState } from 'react';
import {
    FaSun,
    FaWind,
    FaTint,
    FaCloud,
    FaCloudRain,
    FaSnowflake,
    FaBolt,
    FaSmog
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import './Weather.css';
import Cloudy from '../Svgs/Cloudy';



const convertUnixToTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};


const getWeatherIcon = (condition, size = 80) => {
    switch (condition) {
        case 'Clear':
            return <FaSun className="text-warning" size={size} />;
        case 'Clouds':
            return <Cloudy width={size} height={size} />;
        case 'Rain':
        case 'Drizzle':
            return <FaCloudRain className="text-info" size={size} />;
        case 'Thunderstorm':
            return <FaBolt className="text-secondary" size={size} />;
        case 'Snow':
            return <FaSnowflake className="text-primary" size={size} />;
        case 'Mist':
        case 'Fog':
        case 'Haze':
        case 'Smoke':
        case 'Atmosphere':
            return <FaSmog className="text-secondary" size={size} />;
        default:
            return <FaCloud className="text-secondary" size={size} />;
    }
};



export const Weather = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    // REDUX SELECTOR: Fetches and cleans up the weather state
    const weatherState = useSelector(({ weather }) => {
        if (!weather || !weather.main) return {};
        return weather;
    });

    const {
        name = 'N/A',
        main = {},
        wind = {},
        sys = {},
        weather: weatherArray = [] // Contains condition and description
    } = weatherState;

    const currentCondition = weatherArray.length > 0 ? weatherArray[0].main : '';
    const description = weatherArray.length > 0 ?
        (weatherArray[0].description.charAt(0).toUpperCase() + weatherArray[0].description.slice(1)) :
        'Loading weather description...';

    const sunriseTime = convertUnixToTime(sys.sunrise);
    const windSpeed = wind.speed ? wind.speed.toFixed(1) : 'N/A';
    const humidityValue = main.humidity !== undefined ? main.humidity : 'N/A';
    const feelsLikeTemp = main.feels_like !== undefined ? Math.round(main.feels_like) : 'N/A';


    return (
        <div className="weather-container container mt-1">

            <h2 className="title text-center mb-4">🌦️ Weather Overview</h2>

            <div className="row justify-content-center">

                <motion.div
                    initial={{ opacity: 0, y: '-100vh' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    className="mb-4 w-50"
                >
                    <div className="today_card card text-center shadow" style={{ borderRadius: '20px' }}>
                        <div className="card-body">
                            <h5 className="card-title">Today</h5>

                            {currentCondition ? (
                                getWeatherIcon(currentCondition, 80)
                            ) : (
                                <FaCloud className="text-secondary" size={80} />
                            )}

                            {/* City and Country */}
                            <h6 className="card-subtitle mb-2 text-muted">
                                {name} {sys.country ? `(${sys.country})` : ''}
                            </h6>

                            <div className="card-subtitle mb-2 text-muted">
                            </div>

                            {main.feels_like !== undefined && (
                                <motion.p
                                    initial={{ opacity: 0, x: '-100vh' }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1.7 }}
                                    className={`display-4 fw-bold ${main.feels_like >= 25 ? 'text-danger' : 'text-primary'
                                        }`}
                                >
                                    {feelsLikeTemp}°C
                                </motion.p>
                            )}

                            {/* Weather Description */}
                            <p className="card-text">**{description}**</p>

                            {/* Additional Information (Wind, Humidity, Sunrise) */}
                            <motion.div
                                initial={{ opacity: 0, y: '-100vh' }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.7 }}
                                className="more_info d-flex justify-content-around mt-3"
                            >
                                {/* Sunrise Time */}
                                <div className="text-center">
                                    <FaSun className="text-warning mb-1" size={24} />
                                    <small>Sunrise</small>
                                    <p className="mb-0">{sunriseTime}</p>
                                </div>

                                {/* Wind Speed */}
                                <div className="text-center">
                                    <FaWind className="text-info mb-1" size={24} />
                                    <small>Wind</small>
                                    {/* API provides speed in m/s */}
                                    <p className="mb-0">{windSpeed} m/s</p>
                                </div>

                                {/* Humidity */}
                                <div className="text-center">
                                    <FaTint className="text-primary mb-1" size={24} />
                                    <small>Humidity</small>
                                    <p className="mb-0">{humidityValue}%</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};