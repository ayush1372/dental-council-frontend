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
    getCollegeAdminData: (state, action) => {
      state.collegeData = action.payload;
    },
    getCollegeRegistrarData: (state, action) => {
      state.collegeData = action.payload;
    },
    getCollegeDeanData: (state, action) => {
      state.collegeData = action.payload;
    },
    updateCollegeAdminProfile: (state, action) => {
      // eslint-disable-next-line no-console
      console.log('inside college reducer -payload ', action.payload);
      state.collegeData = action.payload;
    },
  },
});

export const {
  getCollegeAdminData,
  getCollegeRegistrarData,
  getCollegeDeanData,
  updateCollegeAdminProfile,
} = collegeReducer.actions;

export default collegeReducer.reducer;
