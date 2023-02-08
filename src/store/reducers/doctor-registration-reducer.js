import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  smcRegistrationDetail: { data: [], isLoading: Boolean(true), isError: false },
};

export const registrationData = createSlice({
  name: 'doctorRegistration',
  initialState,
  reducers: {
    getSmcRegistrationDetails: (state, action) => {
      state.smcRegistrationDetail = action.payload;
    },
  },
});

export const { getSmcRegistrationDetails } = registrationData.actions;

export default registrationData.reducer;
