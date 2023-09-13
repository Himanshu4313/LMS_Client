import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstances";

const initialState = {
    courseData : []
}
//******************BACKEND-PART******************* */
/******THIS IS WORKING WHEN I CREATE A BACKEND PART******************************************** */
export const getAllCourses = createAsyncThunk("/course/get" , async () => {
    try {
        const res = axiosInstance.get("/courses");
        toast.promise(res , {
            loading : "wait courses is loading...",
            success : "course loaded successfully",
            error : "Failed to load courses"
        } );
        return (await res).data.courses;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})
//************************************************* */




export const courseSlice = createSlice({
    name : "courses",
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
         builder.addCase(getAllCourses.fulfilled , (state , action) => {
             if(action.payload){
                  state.courseData = [...action.payload];
             }
         })
    } 
});
export default courseSlice.reducer;