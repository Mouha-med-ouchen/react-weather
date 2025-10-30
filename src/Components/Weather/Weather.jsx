import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import DefaultWeather from '../Svgs/DefaultWeather'
import './Weather.css'

export const Weather = () => {
    return (
        <div className="weather-container container mt-5"
        >
            <h2 className=" title text-center mb-4">🌦️ Weather Overview</h2>

            <div className="row justify-content-center">
                {/* Today's Weather Card */}
                <motion.div
                    initial={{ opacity: 0, y: '-100vh' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    className=" mb-4 w-50">
                    <div className=" today_card card text-center shadow" style={{ borderRadius: '20px' }}>
                        <div className="card-body">
                            <h5 className="card-title">Today</h5>


                            <DefaultWeather
                                width={'250px'} height={'250px'}></DefaultWeather>

                            <h6 className="card-subtitle mb-2 text-muted">Casablanca</h6>
                            <motion.p
                                initial={{ opacity: 0, x: '-100vh' }}     // الحالة الابتدائية
                                animate={{ opacity: 1, x: 0 }}       // الحركة أثناء الظهور
                                transition={{ duration: 1.7 }}
                                className="display-4 fw-bold text-primary">26°C
                            </motion.p>
                            <p className="card-text">Clear sky with light breeze</p>
                        </div>
                    </div>
                </motion.div>

                {/* Last 3 Days Card */}
                <motion.div
                    initial={{ opacity: 0, y: '-100vh' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    className=" col-md-6 mb-4">
                    <div className="last_card card shadow" style={{ borderRadius: '20px' }}>
                        <div className="card-body">
                            <motion.h5
                                initial={{ opacity: 0, x: '100vh' }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.5 }}
                                className="card-title text-center">📅 Last 3 Days</motion.h5>
                            <div className="d-flex justify-content-between px-3 mt-3">
                                <div className="text-center">
                                    <h6>Monday</h6>
                                    <motion.p
                                        className="text-warning fw-bold">28°C ☀️
                                    </motion.p>
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
