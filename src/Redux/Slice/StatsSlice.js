import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstances"

const initialState = {
    allUsersCount : 0,
    subscribeCount : 0 ,
}

export const getStatsData = createAsyncThunk("get/stats" , async () => {
    try {
        const response = await axiosInstance.get("/admin/stats/users");
        toast.promise(response , {
            loading: "Getting the stats...",
            success : (response) =>{
                return response?.data?.message;
            },
            error: "Failed to load data"
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const statsSlice = createSlice({
    name : "stats",
    initialState,
    reducers:{},
    extraReducers : (builder) => {
        builder.addCase(getStatsData.fulfilled , (state , action) => {
          state.allUsersCount = action?.payload?.allUsersCount ;
          state.subscribeCount = action?.payload?.subscribeUsersCount;
        })
    }
})

export default statsSlice.reducer;