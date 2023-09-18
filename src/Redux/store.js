import { configureStore } from "@reduxjs/toolkit";

import authSliceReducers from './Slice/AuthSlice';
import courseSliceReducer from './Slice/courseSlice';
import razorpaySliceReducer from '../Redux/Slice/RazorpaySlice';
const store = configureStore({
    reducer:{
        auth : authSliceReducers,
        courses : courseSliceReducer ,
        razorpay : razorpaySliceReducer ,
    },
    devTools : true,
})

export default store;