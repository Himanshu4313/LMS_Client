import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstances";

const initialState = {
  courseData: [],
};
//******************BACKEND-PART******************* */
/******THIS IS WORKING WHEN I CREATE A BACKEND PART******************************************** */
export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const res = axiosInstance.get("/courses");
    toast.promise(res, {
      loading: "wait courses is loading...",
      success: "course loaded successfully",
      error: "Failed to load courses",
    });
    return (await res).data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
//************************************************* */

/*********************WHEN I CREATE BACKEND THEN ACTUALLY RUN THIS PROGRAMM******************************* */

export const createNewCourse = createAsyncThunk(
  "/course/create",
  async (data) => {
    try {
      let formData = new FormData();
      formData.append("title", data?.title);
      formData.append("category", data?.category);
      formData.append("createdBy", data?.createdBy);
      formData.append("description", data?.description);
      formData.append("previewImage", data?.previewImage);
      formData.append("thumbnail", data?.thumbnail);

      const response = await axiosInstance.post("/courses", formData);
      toast.promise(response, {
        loading: "Wait! course is created",
        success: "course create successfully",
        error: "Failed to create course",
      });
      return (await response)?.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }
);

/***************************************************** */

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        state.courseData = [...action.payload];
      }
    });
  },
});
export default courseSlice.reducer;
