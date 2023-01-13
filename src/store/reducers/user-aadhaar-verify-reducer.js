import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  aadharData: { data: [], isLoading: Boolean(true), isError: false },
};

export const AadhaarTransactionId = createSlice({
  name: 'AadhaarTransactionId',
  initialState,
  reducers: {
    aadhaarNumberData: (state, action) => {
      state.aadharData = action.payload;
    },
  },
});

export const { aadhaarNumberData } = AadhaarTransactionId.actions;

export default AadhaarTransactionId.reducer;
