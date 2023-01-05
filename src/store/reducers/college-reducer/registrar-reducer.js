import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  registrarDetails: { data: [], isLoading: Boolean(true), isError: false },
};

const collegeData = createSlice({
  name: 'collegeData',
  initialState,
  reducers: {
    detailsOfRegistrar: (state, action) => {
      state.registrarDetails = action.payload;
    },
  },
});

export const { detailsOfRegistrar } = collegeData.actions;

export default collegeData.reducer;
