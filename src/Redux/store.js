import { configureStore } from "@reduxjs/toolkit";

import authSliceReducers from './Slice/AuthSlice';
import courseSliceReducer from './Slice/courseSlice';
import razorpaySliceReducer from '../Redux/Slice/RazorpaySlice';
import lectureSliceReducer from './Slice/LectureSlice';
const store = configureStore({
    reducer:{
        auth : authSliceReducers,
        courses : courseSliceReducer ,
        razorpay : razorpaySliceReducer ,
        lecture : lectureSliceReducer,
    },
    devTools : true,
})

export default store;