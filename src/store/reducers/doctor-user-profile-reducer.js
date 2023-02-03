import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doctorUserProfile: { data: [], isLoading: Boolean(true), isError: false },
  profileImage: { data: [], isLoading: Boolean(true), isError: false },
};

const doctorUserProfileReducer = createSlice({
  name: 'doctorUserProfileReducer',
  initialState,
  reducers: {
    getDoctorUserProfile: (state, action) => {
      state.doctorUserProfile = action.payload;
    },
    getProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
  },
});

export const { getDoctorUserProfile, getProfileImage } = doctorUserProfileReducer.actions;

export default doctorUserProfileReducer.reducer;
