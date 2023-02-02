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
  registrationCouncilList: { data: [], isLoading: Boolean(true), isError: false },
  sendNotificationOtpData: { data: [], isLoading: Boolean(true), isError: false },
  verifyNotificationOtpData: { data: [], isLoading: Boolean(true), isError: false },
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
    getRegistrationCouncil: (state, action) => {
      state.registrationCouncilList = action.payload;
    },
    sendNotificationData: (state, action) => {
      state.sendNotificationOtpData = action.payload;
    },
    verifyNotificationData: (state, action) => {
      state.verifyNotificationOtpData = action.payload;
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
  getRegistrationCouncil,
  sendNotificationData,
  verifyNotificationData,
} = CommonActivity.actions;

export default CommonActivity.reducer;
