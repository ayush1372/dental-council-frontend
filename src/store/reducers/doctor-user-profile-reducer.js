import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalDetails: { data: [], isLoading: Boolean(true), isError: false },
  registrationDetails: { data: [], isLoading: Boolean(true), isError: false },
  workProfileDetails: { data: [], isLoading: Boolean(true), isError: false },
  profileImage: { data: [], isLoading: Boolean(true), isError: false },
  esignDetails: { data: [], isLoading: Boolean(true), isError: false },
  updatedPersonalDetails: { data: [], isLoading: Boolean(true), isError: false },
  updatedRegistrationDetails: { data: [], isLoading: Boolean(true), isError: false },
  selectedQualificationTypeValue: '',
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
    getUpdatedPersonalDetails: (state, action) => {
      state.updatedPersonalDetails = action.payload;
    },
    getUpdatedRegistrationDetails: (state, action) => {
      state.updatedRegistrationDetails = action.payload;
    },
    selectedQualificationType: (state, action) => {
      state.selectedQualificationTypeValue = action.payload;
    },
    resetDoctorProfileReducer: () => initialState,
  },
});

export const {
  getPersonalDetails,
  getRegistrationDetails,
  getWorkProfileDetails,
  getProfileImage,
  getEsignDetails,
  getUpdatedPersonalDetails,
  getUpdatedRegistrationDetails,
  selectedQualificationType,
  resetDoctorProfileReducer,
} = doctorUserProfileReducer.actions;

export default doctorUserProfileReducer.reducer;
