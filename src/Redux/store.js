import { configureStore } from "@reduxjs/toolkit";

import authSliceReducers from './Slice/AuthSlice';
const store = configureStore({
    reducer:{
        auth : authSliceReducers,
    },
    devTools : true,
})

export default store;