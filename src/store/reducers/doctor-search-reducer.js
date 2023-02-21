import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchDetails: { data: [], isLoading: Boolean(true), isError: false },
};

const searchDoctorReducer = createSlice({
  name: 'searchDoctorData',
  initialState,
  reducers: {
    searchDoctor: (state, action) => {
      state.searchDetails.data = action.payload;
    },
  },
});

export const { searchDoctor } = searchDoctorReducer.actions;

export default searchDoctorReducer.reducer;
