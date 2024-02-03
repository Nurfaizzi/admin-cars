import { configureStore } from "@reduxjs/toolkit";
import carSlice from './cars/carSlice'

export const store = configureStore({
    reducer:{
        cars : carSlice
    }
})