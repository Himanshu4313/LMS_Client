import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstances";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVarified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: [],
};

//this thunk is used for get razorpay id from the server
export const getRazorpayId = createAsyncThunk("/razorpay/getId", async () => {
  try {
    const response = await axiosInstance.get("/payments/razorpay-key");
    return response.data;
  } catch (error) {
    toast.error("Failed to load data..");
  }
});

// purchaseCourseBundal thunk
export const purchaseCourseBundal = createAsyncThunk(
  "/purchaseCourse",
  async () => {
    try {
      const response = await axiosInstance.post("/payments/subscribe");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }
);
// varifyUserPayments thunk
export const varifyUserPayment = createAsyncThunk(
  "/payments/varify",
  async (data) => {
    try {
      const response = await axiosInstance.post("/payments/varify", {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_subscription_id: data.razorpay_subscription_id,
        razorpay_signature: data.razorpay_signature,
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
// getPaymentsRecord thunk
export const getPaymentRecord = createAsyncThunk(
  "/payments/record",
  async () => {
    try {
      const response = axiosInstance.get("/payments?count=100");
      toast.promise(response, {
        loading: "Loading the payment record",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to get payment record",
      });
      return (await response).data;
    } catch (error) {
      toast.error("Operation failed..");
    }
  }
);
//Thunk for cancelCourseBundle
export const cancelCourseBundle = createAsyncThunk(
  "/payments/cancel",
  async () => {
    try {
      const response = axiosInstance.post("/payments/unsubscribe");
      toast.promise(response, {
        loading: "Wait unSubscribing the course bundle",
        success: (data) => {
          return data?.data?.success;
        },
        error: "Failed to unSubscribe your course bundle",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
export const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRazorpayId.fulfilled, (state, action) => {
      state.key = action?.payload?.key;
    });
    builder.addCase(purchaseCourseBundal.fulfilled, (state, action) => {
      state.subscription_id = action?.payload?.subscription_id;
    });
    builder.addCase(varifyUserPayment.fulfilled, (state, action) => {
      toast.success(action?.payload?.message);
      state.isPaymentVarified = action?.payload?.success;
    });
    builder.addCase(varifyUserPayment.rejected, (state, action) => {
      toast.success(action?.payload?.message);
      state.isPaymentVarified = action?.payload?.success;
    });

    builder.addCase(getPaymentRecord.fulfilled, (state, action) => {
      state.allPayments = action?.payload?.allPayments;
      state.finalMonths = action?.payload?.finalMonths;
      state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
    });
  },
});

export default razorpaySlice.reducer;
