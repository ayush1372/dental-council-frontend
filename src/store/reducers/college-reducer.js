import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collegeData: {
    data: [],
    isLoading: Boolean(true),
    isError: false,
  },
  registrarDetails: { data: [], isLoading: Boolean(true), isError: false },
  deanDetails: { data: [], isLoading: Boolean(true), isError: false },
  collegeRegisterDetails: { data: [], isLoading: Boolean(true), isError: false },
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
      state.collegeData = action.payload;
    },
    detailsOfRegistrar: (state, action) => {
      state.registrarDetails = action.payload;
    },
    detailsOfDean: (state, action) => {
      state.deanDetails = action.payload;
    },
    collegeRegister: (state, action) => {
      state.collegeRegisterDetails = action.payload;
    },
  },
});

export const {
  getCollegeAdminData,
  getCollegeRegistrarData,
  getCollegeDeanData,
  updateCollegeAdminProfile,
  detailsOfRegistrar,
  detailsOfDean,
  collegeRegister,
} = collegeReducer.actions;

export default collegeReducer.reducer;
