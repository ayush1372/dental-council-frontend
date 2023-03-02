import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalDetails: { data: [], isLoading: Boolean(true), isError: false },
  registrationDetails: { data: [], isLoading: Boolean(true), isError: false },
  workProfileDetails: { data: [], isLoading: Boolean(true), isError: false },
  profileImage: { data: [], isLoading: Boolean(true), isError: false },
  esignDetails: { data: [], isLoading: Boolean(true), isError: false },
};

const doctorUserProfileReducer = createSlice({
  name: 'doctorUserProfileReducer',
  initialState,
  reducers: {
    getPersonalDetails: (state, action) => {
      state.personalDetails = action.payload;
    },
    getRegistrationDetails: (state, action) => {
      state.registrationDetails = action.payload;
    },
    getWorkProfileDetails: (state, action) => {
      state.workProfileDetails = action.payload;
    },
    getProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    getEsignDetails: (state, action) => {
      state.esignDetails = action.payload;
    },
  },
});

export const {
  getPersonalDetails,
  getRegistrationDetails,
  getWorkProfileDetails,
  getProfileImage,
  getEsignDetails,
} = doctorUserProfileReducer.actions;

export default doctorUserProfileReducer.reducer;
