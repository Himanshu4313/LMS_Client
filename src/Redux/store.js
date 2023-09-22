import { configureStore } from "@reduxjs/toolkit";

import authSliceReducers from './Slice/AuthSlice';
import courseSliceReducer from './Slice/courseSlice';
import razorpaySliceReducer from '../Redux/Slice/RazorpaySlice';
import lectureSliceReducer from './Slice/LectureSlice';
import statsSliceReducer from './Slice/StatsSlice';
const store = configureStore({
    reducer:{
        auth : authSliceReducers,
        courses : courseSliceReducer ,
        razorpay : razorpaySliceReducer ,
        lecture : lectureSliceReducer,
        stats : statsSliceReducer,
    },
    devTools : true,
})

export default store;