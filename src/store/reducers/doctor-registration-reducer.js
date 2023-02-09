import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  getSmcRegistrationDetails: { data: [], isLoading: Boolean(true), isError: false },
  getHprIdByMobile: { data: [], isLoading: Boolean(true), isError: false },
  getHprIdSuggestion: { data: [], isLoading: Boolean(true), isError: false },
  generateHprIdData: { data: [], isLoading: Boolean(true), isError: false },
  getResetPasswordLink: { data: [], isLoading: Boolean(true), isError: false },
  mobileOtp: '',
  mobileNumber: '',
};

export const registrationData = createSlice({
  name: 'doctorRegistration',
  initialState,
  reducers: {
    smcRegistrationDetail: (state, action) => {
      state.getSmcRegistrationDetails = action.payload;
    },
    searchByMobileHprId: (state, action) => {
      state.getHprIdByMobile = action.payload;
    },
    hprIdSuggestionsData: (state, action) => {
      state.getHprIdSuggestion = action.payload;
    },
    hprIdData: (state, action) => {
      state.generateHprIdData = action.payload;
    },
    sendResetPasswordLinkData: (state, action) => {
      state.getResetPasswordLink = action.payload;
    },
    storeUserMobileOtp: (state, action) => {
      state.mobileOtp = action.payload;
    },
    storeUserMobileNumber: (state, action) => {
      state.mobileNumber = action.payload;
    },
  },
});

export const {
  smcRegistrationDetail,
  sendResetPasswordLinkData,
  storeUserMobileNumber,
  storeUserMobileOtp,
  hprIdData,
  searchByMobileHprId,
  hprIdSuggestionsData,
} = registrationData.actions;

export default registrationData.reducer;
