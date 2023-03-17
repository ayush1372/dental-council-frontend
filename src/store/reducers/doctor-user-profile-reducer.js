import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalDetails: { data: [], isLoading: Boolean(true), isError: false },
  registrationDetails: { data: [], isLoading: Boolean(true), isError: false },
  workProfileDetails: { data: [], isLoading: Boolean(true), isError: false },
  profileImage: { data: [], isLoading: Boolean(true), isError: false },
  updatedPersonalDetails: { data: [], isLoading: Boolean(true), isError: false },
  updatedRegistrationDetails: { data: [], isLoading: Boolean(true), isError: false },
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
    getUpdatedPersonalDetails: (state, action) => {
      state.updatedPersonalDetails = action.payload;
    },
    getUpdatedRegistrationDetails: (state, action) => {
      state.updatedRegistrationDetails = action.payload;
    },
  },
});

export const {
  getPersonalDetails,
  getRegistrationDetails,
  getWorkProfileDetails,
  getProfileImage,
  getUpdatedPersonalDetails,
  getUpdatedRegistrationDetails,
} = doctorUserProfileReducer.actions;

export default doctorUserProfileReducer.reducer;
