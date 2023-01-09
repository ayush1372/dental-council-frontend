/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tnxID: { data: '', isLoading: Boolean(true), isError: false },
};

export const AadhaarTransactionId = createSlice({
  name: 'AadhaarTransactionId',
  initialState,
  reducers: {
    userTxId: (state, action) => {
      state.tnxID = action.payload;
    },
  },
});

export const { userTxId } = AadhaarTransactionId.actions;

export default AadhaarTransactionId.reducer;
