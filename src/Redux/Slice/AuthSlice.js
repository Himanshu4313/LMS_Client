import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstances";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  // data: JSON.parse(localStorage.getItem("data")) || {},
  data: localStorage.getItem("data") || {},
};
// *****************************
//backend part [panding]
// This createAccount code is work perfectly when i create  a server ....
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res =  axiosInstance.post("user/register", data);
    toast.promise(res, {
      loading: "Wait! creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
// *******************************

// *****************************
//backend part [panding]
// This login Account code is work perfectly when i create  a server ....
export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res =  axiosInstance.post("user/login", data);
    toast.promise(res, {
      loading: "Wait! login here...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to login",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
// *******************************

//*************This is Logout part************* */

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const res =  axiosInstance.post("user/logout");
    toast.promise(res, {
      loading: "Wait! logout is processing..",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to logout",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
//************************************************ */

// ************************This is working when backend is create****************************
export const editProfileData = createAsyncThunk(
  "user/update/profile",
  async (data) => {
    try {
      const response =  axiosInstance.put(`/user/update/${data[0]}`, data[1]);
      toast.promise(response, {
        loading: "Wait your profile is updating..",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to update your profile",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
/***************************************************** */

// ************************this part is working when backend is create****************************
export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const res = await axiosInstance.get("user/me");
    return (await res).data;
  } catch (error) {
    toast.error(error.message);
  }
});
/**************************************************** */
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("data", JSON.stringify(action?.payload?.user));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", action?.payload?.user?.role);

      state.isLoggedIn = true;
      state.data = action?.payload?.user;
      state.role = action?.payload?.role;
    }),
      builder.addCase(logout.fulfilled, (state, action) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.data = {};
        state.role = "";
      }),
      builder.addCase(getUserData.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
  
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.role;
      });
  },
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
