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
  initiateCollegeWorkFlow: { data: [], isLoading: Boolean(true), isError: false },
  collegeAdminVerifier: { data: [], isLoading: Boolean(true), isError: false },
  collegeAdminDesignation: { data: [], isLoading: Boolean(true), isError: false },
  updateCollegeDetails: { data: [], isLoading: Boolean(true), isError: false },
  registerCollegeDetail: { data: [], isLoading: Boolean(true), isError: false },
  collegeProfileDetails: { data: [], isLoading: Boolean(true), isError: false },
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
    collegeAdminVerifier: (state, action) => {
      state.collegeAdminVerifier = action.payload;
    },
    getCollegeAdminDesignation: (state, action) => {
      state.collegeAdminDesignation = action.payload;
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
    updateCollege: (state, action) => {
      state.updateCollegeDetails = action.payload;
    },
    collegeProfile: (state, action) => {
      state.collegeData = action.payload;
    },
    registerCollege: (state, action) => {
      state.registerCollegeDetail = action.payload;
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
  collegeAdminVerifier,
  getCollegeAdminDesignation,
  updateCollegeAdminProfile,
  detailsOfRegistrar,
  detailsOfDean,
  collegeRegister,
  postInitiateCollegeWorkFlow,
  resetCollegeWorkflowReducer,
  updateCollege,
  registerCollege,
  collegeProfile,
} = collegeReducer.actions;

export default collegeReducer.reducer;
