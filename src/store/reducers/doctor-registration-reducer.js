/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  getSmcRegistrationDetails: { data: [], isLoading: Boolean(true), isError: false },
  getAccessTokenDetails: { data: [], isLoading: Boolean(true), isError: false },
  getMobileOtpDetails: { data: [], isLoading: Boolean(true), isError: false },
  hpIdExistsDetailsData: { data: [], isLoading: Boolean(true), isError: false },
  hprIdSuggestionsDetailsData: { data: [], isLoading: Boolean(true), isError: false },
  hprIdDataDetails: { data: [], isLoading: Boolean(true), isError: false },
  storeMobileDetailsData: { data: [], isLoading: Boolean(true), isError: false },
  typeOfOtpDetailsData: { data: [], isLoading: Boolean(true), isError: false },
  getkycDetailsData: { data: [], isLoading: Boolean(true), isError: false },
  healthProfessionalDetailsData: { data: [], isLoading: Boolean(true), isError: false },
  UserNotFoundDetailsData: { data: [] },
};

export const registrationData = createSlice({
  name: 'doctorRegistration',
  initialState,
  reducers: {
    smcRegistrationDetail: (state, action) => {
      state.getSmcRegistrationDetails = action.payload;
    },
    getkycDetails: (state, action) => {
      state.getkycDetailsData = action.payload;
    },
    getMobileOtp: (state, action) => {
      state.getMobileOtpDetails = action.payload;
    },
    hpIdExistsDetails: (state, action) => {
      state.hpIdExistsDetailsData = action.payload;
    },
    hprIdSuggestionsDetails: (state, action) => {
      state.hprIdSuggestionsDetailsData = action.payload;
    },
    createhprIdData: (state, action) => {
      state.hprIdDataDetails = action.payload;
    },
    storeMobileDetails: (state, action) => {
      state.storeMobileDetailsData = action.payload;
    },
    getAccessToken: (state, action) => {
      state.getAccessTokenDetails = action.payload;
    },
    setUserPasswordData: (state, action) => {
      state.getAccessTokenDetails = action.payload;
    },
    healthProfessionalDetails: (state, action) => {
      state.healthProfessionalDetailsData = action.payload;
    },
    UserNotFoundDetails: (state, action) => {
      state.UserNotFoundDetailsData = action.payload;
    },
  },
});

export const {
  smcRegistrationDetail,
  getAccessToken,
  getMobileOtp,
  hpIdExistsDetails,
  hprIdSuggestionsDetails,
  createhprIdData,
  storeMobileDetails,
  getkycDetails,
  setUserPasswordData,
  healthProfessionalDetails,
  UserNotFoundDetails,
} = registrationData.actions;

export default registrationData.reducer;
