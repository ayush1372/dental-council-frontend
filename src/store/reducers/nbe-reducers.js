import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nbeData: {
    data: [],
    isLoading: Boolean(true),
    isError: false,
  },
};

const nbeReducer = createSlice({
  name: 'nbe',
  initialState,
  reducers: {
    getNBEData: (state, action) => {
      state.nbeData = action.payload;
    },
  },
});

export const { getNBEData } = nbeReducer.actions;

export default nbeReducer.reducer;
