import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doctorUserProfile: { data: [], isLoading: Boolean(true), isError: false },
};

const doctorUserProfileList = createSlice({
  name: 'doctorUserProfileList',
  initialState,
  reducers: {
    getDoctorUserProfile: (state, action) => {
      state.doctorUserProfile = action.payload;
    },
  },
});

export const { getDoctorUserProfile } = doctorUserProfileList.actions;

export default doctorUserProfileList.reducer;
