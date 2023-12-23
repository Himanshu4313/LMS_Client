import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstances";

const initialState = {
  lectures: [],
};

// this function is get the lecture of purchase course
export const getCourseLecture = createAsyncThunk(
  "/course/lecture/get",
  async (courseId) => {
    try {
      const response = axiosInstance.get(`/courses/${courseId}`);
      toast.promise(response, {
        loading: "Fetching course lecture",
        success: "Lecture fetch successfully",
        error: "Failed to load the lecture",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const addCourseLecture = createAsyncThunk(
  "/course/lecture/add",
  async (data) => {
    try {
      const formData = new FormData();
      formData.append("lecture", data.video_url);
      formData.append("title", data.title);
      formData.append("description", data.description);

      const response = axiosInstance.post(`/courses/${data.id}`, formData);
      toast.promise(response, {
        loading: "Course lecture is loading",
        success: "Course lecture add successfully",
        error: "Failed to add course lecture",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteCourseLecture = createAsyncThunk(
  "/course/lecture/delete",
  async (data) => {
    try {
      const response = axiosInstance.delete(
        `/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`
      );
      toast.promise(response, {
        loading: " Wait delete your course lecture",
        success: "Lecture deleted successully",
        error: "Failed to delete the lecture",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourseLecture.fulfilled, (state, action) => {
      console.log('payload lecture',action.payload.lectures)
      state.lectures = action?.payload?.lectures;
    });
    builder.addCase(addCourseLecture.fulfilled, (state, action) => {
      state.lectures = action?.payload?.course?.lectures;
    });
  },
});

export default lectureSlice.reducer;
