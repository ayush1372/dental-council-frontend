import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collegeData: {
    data: [],
    isLoading: Boolean(true),
    isError: false,
  },
  registrarDetails: { data: [], isLoading: Boolean(true), isError: false },
  deanDetails: { data: [], isLoading: Boolean(true), isError: false },
  initiateCollegeWorkFlow: { data: [], isLoading: Boolean(true), isError: false },
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
    detailsOfRegistrar: (state, action) => {
      state.registrarDetails = action.payload;
    },
    detailsOfDean: (state, action) => {
      state.deanDetails = action.payload;
    },
    postInitiateCollegeWorkFlow: (state, action) => {
      state.initiateCollegeWorkFlow = action.payload;
    },
    resetCollegeWorkflowReducer: () => initialState.initiateCollegeWorkFlow,
  },
});

export const {
  getCollegeAdminData,
  getCollegeRegistrarData,
  getCollegeDeanData,
  detailsOfRegistrar,
  detailsOfDean,
  postInitiateCollegeWorkFlow,
  resetCollegeWorkflowReducer,
} = collegeReducer.actions;

export default collegeReducer.reducer;
