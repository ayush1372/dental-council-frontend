import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  getSmcRegistrationDetails: { data: [], isLoading: Boolean(true), isError: false },
};

export const registrationData = createSlice({
  name: 'doctorRegistration',
  initialState,
  reducers: {
    smcRegistrationDetail: (state, action) => {
      state.getSmcRegistrationDetails = action.payload;
    },
  },
});

export const { smcRegistrationDetail } = registrationData.actions;

export default registrationData.reducer;
