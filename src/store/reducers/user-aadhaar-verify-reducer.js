import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  aadharData: { data: [], isLoading: Boolean(true), isError: false },
  aadhaarOtpDetailsData: { data: [], isLoading: Boolean(true), isError: false },
  typeOfOtpDetailsData: { data: [], isLoading: Boolean(true), isError: false },
};

export const AadhaarTransactionId = createSlice({
  name: 'AadhaarTransactionId',
  initialState,
  reducers: {
    aadhaarNumberData: (state, action) => {
      state.aadharData = action.payload;
    },
    aadhaarOtpDetails: (state, action) => {
      state.aadhaarOtpDetailsData = action.payload;
    },
    typeOfOtp: (state, action) => {
      state.typeOfOtpDetailsData = action.payload;
    },
  },
});

export const { aadhaarNumberData, aadhaarOtpDetails, typeOfOtp } = AadhaarTransactionId.actions;

export default AadhaarTransactionId.reducer;
