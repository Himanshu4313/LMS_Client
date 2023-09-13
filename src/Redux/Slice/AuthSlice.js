import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstances";

const initialState = {
  
    isLoggedIn : localStorage.getItem('isLoggedIn') || false,
    role : localStorage.getItem("role") || " ",
    data : localStorage.getItem("data") || {}, 

}
// *****************************
//backend part [panding]
// This createAccount code is work perfectly when i create  a server ....
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try{
        const res = axiosInstance.post("user/register", data) ;
        toast.promise(res , {
            loading : "Wait! creating your account",
            success : (data) => {
                return data?.data?.message;
            },
            error : "Failed to create account",
        }) ;
        return (await res).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})
// *******************************

// *****************************
//backend part [panding]
// This login Account code is work perfectly when i create  a server ....
export const login = createAsyncThunk("/auth/login", async (data) => {
    try{
        const res = axiosInstance.post("user/login", data) ;
        toast.promise(res , {
            loading : "Wait! login here...",
            success : (data) => {
                return data?.data?.message;
            },
            error : "Failed to login",
        }) ;
        return (await res).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})
// *******************************


//*************This is Logout part************* */

export const logout = createAsyncThunk("auth/logout" , async () => {
    try{
        const res = axiosInstance.post("user/logout");
        toast.promise(res , {
            loading : "Wait! logout is processing..",
            success : (data) => {
                return data?.data?.message;
            },
            error : "Failed to logout",
        });
        return (await res).data;
    }catch(error){
         toast.error(error?.response?.data?.message);
    }
});
//************************************************ */
 export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
        builder.addCase(login.fulfilled, (state , action) =>{
          localStorage.setItem("data" , JSON.stringify(action?.payload?.user));       
          localStorage.setItem("isLoggedIn" , true);
          localStorage.setItem("role" , action?.payload?.user?.role);
          state.isLoggedIn = true;
          state.data = action?.payload?.user;
          state.role = action?.payload?.role;
        }),
        builder.addCase(logout.fulfilled , (state , action) => {
            localStorage.clear();
           state.isLoggedIn = false;
           state.data = {};
           state.role = "";
        })
    }
});

// export const {} = authSlice.actions;

export default authSlice.reducer;