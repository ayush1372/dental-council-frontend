import { createSlice } from '@reduxjs/toolkit';

import { SessionTimer } from '../../constants/session-timer';

const sessionTiming = 0.5;

const initialState = {
  apiLoading: false,
  isloggedIn: false,
  timer: 0,
  mobileNumber: undefined,
  loggedInUserType: '',
  userActiveTab: '',
  statesList: { data: [], isLoading: Boolean(true), isError: false },
  citiesList: { data: [], isLoading: Boolean(true), isError: false },
  countriesList: { data: [], isLoading: Boolean(true), isError: false },
  districtsList: { data: [], isLoading: Boolean(true), isError: false },
  subDistrictList: { data: [], isLoading: Boolean(true), isError: false },
  languagesList: { data: [], isLoading: Boolean(true), isError: false },
  universitiesList: { data: [], isLoading: Boolean(true), isError: false },
  collegesList: { data: [], isLoading: Boolean(true), isError: false },
  coursesList: { data: [], isLoading: Boolean(true), isError: false },
  specialitiesList: { data: [], isLoading: Boolean(true), isError: false },
  councilNames: { data: [], isLoading: Boolean(true), isError: false },
};

export const CommonActivity = createSlice({
  name: 'common',
  initialState,
  reducers: {
    resetCommonReducer: () => initialState,
    login: (state) => {
      state.isloggedIn = true;
      state.timer = SessionTimer(sessionTiming * 60);
    },
    logout: (state) => {
      state.isloggedIn = false;
      state.timer = 0;
    },
    setMobileNumber: (state, action) => {
      state.mobileNumber = action.payload;
    },
    userLoggedInType: (state, action) => {
      state.loggedInUserType = action.payload;
    },
    setApiLoading: (state, action) => {
      state.apiLoading = action.payload;
    },
    changeUserActiveTab: (state, action) => {
      state.userActiveTab = action.payload;
    },
    getStates: (state, action) => {
      state.statesList = action.payload;
    },
    getCities: (state, action) => {
      state.citiesList = action.payload;
    },
    getCountries: (state, action) => {
      state.countriesList = action.payload;
    },
    getDistricts: (state, action) => {
      state.districtsList = action.payload;
    },
    getSubDistricts: (state, action) => {
      state.subDistrictList = action.payload;
    },
    getLanguages: (state, action) => {
      state.languagesList.data = action.payload;
    },
    getUniversities: (state, action) => {
      state.universitiesList.data = action.payload;
    },
    getColleges: (state, action) => {
      state.collegesList.data = action.payload;
    },
    getCourses: (state, action) => {
      state.coursesList.data = action.payload;
    },
    getSpecialities: (state, action) => {
      state.specialitiesList.data = action.payload;
    },
    updateCouncilNames: (state, action) => {
      state.councilNames = action.payload;
    },
  },
});

export const {
  login,
  logout,
  fontsizes,
  setMobileNumber,
  userLoggedInType,
  resetCommonReducer,
  setApiLoading,
  changeUserActiveTab,
  getStates,
  getCities,
  getCountries,
  getDistricts,
  getSubDistricts,
  getLanguages,
  getColleges,
  getUniversities,
  getCourses,
  getSpecialities,
  updateCouncilNames,
} = CommonActivity.actions;

export default CommonActivity.reducer;
