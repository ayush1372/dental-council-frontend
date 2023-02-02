import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doctorUserProfile: { data: [], isLoading: Boolean(true), isError: false },
  registrationAndAcademicDetails: { data: [], isLoading: Boolean(true), isError: false },
  workProfileDetails: { data: [], isLoading: Boolean(true), isError: false },
  profileImage: { data: [], isLoading: Boolean(true), isError: false },
};

const doctorUserProfileReducer = createSlice({
  name: 'doctorUserProfileReducer',
  initialState,
  reducers: {
    getDoctorUserProfile: (state, action) => {
      state.doctorUserProfile = action.payload;
    },
    updateRegistrationAndAcademicDetails: (state, action) => {
      state.registrationAndAcademicDetails = action.payload;
    },
    updateWorkProfileDetails: (state, action) => {
      state.workProfileDetails = action.payload;
    },
    getProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
  },
});

export const {
  getDoctorUserProfile,
  updateRegistrationAndAcademicDetails,
  updateWorkProfileDetails,
  getProfileImage,
} = doctorUserProfileReducer.actions;

export default doctorUserProfileReducer.reducer;
