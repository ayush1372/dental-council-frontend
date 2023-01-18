import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collegeData: {
    data: [],
    isLoading: Boolean(true),
    isError: false,
  },
};

const collegeReducer = createSlice({
  name: 'college',
  initialState,
  reducers: {
    getCollegeData: (state, action) => {
      state.collegeData = action.payload;
    },
  },
});

export const { getCollegeData } = collegeReducer.actions;

export default collegeReducer.reducer;
