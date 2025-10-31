// src/features/weather/weatherSlice.js

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // These keys match the properties you are dispatching
    clouds: undefined,
    main: undefined,
    name: undefined,
    sys: undefined,
    weather: undefined,
    wind: undefined
}

export const WeatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setData: (state, action) => {
            // FIX: Returning the payload replaces the entire state object.
            return action.payload;
        }
    }
})

export const { setData } = WeatherSlice.actions
export default WeatherSlice.reducer