import React from 'react';
import { FaSun, FaWind, FaTint } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import './Weather.css';
import Cloudy from '../Svgs/Cloudy';
import { useSelector } from 'react-redux';

export const Weather = () => {
    const weatherState = useSelector(({ weather }) => {
        // تأكد أن الحالة موجودة لتفادي الأخطاء عند أول تحميل
        if (!weather || !weather.main) return {};
        console.log(weather.main.feels_like);
        return weather;
    });

    return (
        <div className="weather-container container mt-1">
            <h2 className="title text-center mb-4">🌦️ Weather Overview</h2>

            <div className="row justify-content-center">
                {/* ✅ بطاقة اليوم */}
                <motion.div
                    initial={{ opacity: 0, y: '-100vh' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    className="mb-4 w-50"
                >
                    <div className="today_card card text-center shadow" style={{ borderRadius: '20px' }}>
                        <div className="card-body">
                            <h5 className="card-title">Today</h5>

                            <Cloudy width={80} height={80} />

                            <h6 className="card-subtitle mb-2 text-muted">{weatherState.name}</h6>

                            <div className="card-subtitle mb-2 text-muted">
                                <span>15H22MIN</span>
                            </div>

                            {weatherState.main && (
                                <motion.p
                                    initial={{ opacity: 0, x: '-100vh' }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1.7 }}
                                    className={`display-4 fw-bold ${weatherState.main.feels_like >= 30 ? 'text-danger' : 'text-primary'
                                        }`}
                                >
                                    {Math.round(weatherState.main.feels_like)}°C
                                </motion.p>
                            )}


                            <p className="card-text">Clear sky with light breeze</p>

                            {/* ✅ معلومات إضافية */}
                            <motion.div
                                initial={{ opacity: 0, y: '-100vh' }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.7 }}
                                className="more_info d-flex justify-content-around mt-3"
                            >
                                <div className="text-center">
                                    <FaSun className="text-warning mb-1" size={24} />
                                    <small>Sunrise</small>
                                    <p className="mb-0">6:45 AM</p>
                                </div>

                                <div className="text-center">
                                    <FaWind className="text-info mb-1" size={24} />
                                    <small>Wind</small>
                                    <p className="mb-0">12 km/h</p>
                                </div>

                                <div className="text-center">
                                    <FaTint className="text-primary mb-1" size={24} />
                                    <small>Humidity</small>
                                    <p className="mb-0">60%</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* ✅ البطاقة الثانية - الأيام القادمة */}
                <motion.div
                    initial={{ opacity: 0, y: '-100vh' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    className="col-md-6 mb-4"
                >
                    <div className="last_card card shadow" style={{ borderRadius: '20px' }}>
                        <div className="card-body">
                            <motion.h5
                                initial={{ opacity: 0, x: '100vh' }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.5 }}
                                className="card-title text-center"
                            >
                                📅 Next 3 Days
                            </motion.h5>

                            <div className="d-flex justify-content-between px-3 mt-3">
                                <div className="text-center">
                                    <h6>Monday</h6>
                                    <p className="text-warning fw-bold">28°C ☀️</p>
                                    <small>Sunny</small>
                                </div>
                                <div className="text-center">
                                    <h6>Tuesday</h6>
                                    <p className="text-primary fw-bold">23°C 🌧️</p>
                                    <small>Rainy</small>
                                </div>
                                <div className="text-center">
                                    <h6>Wednesday</h6>
                                    <p className="text-info fw-bold">25°C 🌤️</p>
                                    <small>Partly Cloudy</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
