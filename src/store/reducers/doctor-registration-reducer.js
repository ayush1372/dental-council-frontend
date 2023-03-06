import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  getSmcRegistrationDetails: { data: [], isLoading: Boolean(true), isError: false },
  getAccessTokenDetails: { data: [], isLoading: Boolean(true), isError: false },
  getMobileOtpDetails: { data: [], isLoading: Boolean(true), isError: false },
  hpIdExistsDetailsData: { data: [], isLoading: Boolean(true), isError: false },
  hprIdSuggestionsDetailsData: { data: [], isLoading: Boolean(true), isError: false },
  sendResetPasswordLinkDetailsData: { data: [], isLoading: Boolean(true), isError: false },
  hprIdDataDetails: { data: [], isLoading: Boolean(true), isError: false },
  storeMobileDetailsData: { data: [], isLoading: Boolean(true), isError: false },
  typeOfOtpDetailsData: { data: [], isLoading: Boolean(true), isError: false },
};

export const registrationData = createSlice({
  name: 'doctorRegistration',
  initialState,
  reducers: {
    smcRegistrationDetail: (state, action) => {
      state.getSmcRegistrationDetails = action.payload;
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
    sendResetPasswordLinkDetails: (state, action) => {
      state.sendResetPasswordLinkDetailsData = action.payload;
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
  },
});

export const {
  smcRegistrationDetail,
  getAccessToken,
  getMobileOtp,
  storeMobileOtpData,
  hpIdExistsDetails,
  hprIdSuggestionsDetails,
  sendResetPasswordLinkDetails,
  createhprIdData,
  storeMobileDetails,
} = registrationData.actions;

export default registrationData.reducer;
