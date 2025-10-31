import { configureStore } from "@reduxjs/toolkit";
import  WeatherSlice from "../../features/weather/weatherSlice";

export const store = configureStore(
    {
        reducer: {
            weather: WeatherSlice
        }
    }
)