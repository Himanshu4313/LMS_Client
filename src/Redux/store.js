import { configureStore } from "@reduxjs/toolkit";

import authSliceReducers from './Slice/AuthSlice';
import courseSliceReducer from './Slice/courseSlice';
const store = configureStore({
    reducer:{
        auth : authSliceReducers,
        courses : courseSliceReducer ,
    },
    devTools : true,
})

export default store;