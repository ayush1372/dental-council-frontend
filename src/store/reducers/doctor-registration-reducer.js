import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  smcRegistrationDetail: { data: [], isLoading: Boolean(true), isError: false },
};

export const CommonActivity = createSlice({
  name: 'doctorRegistration',
  initialState,
  reducers: {
    getSmcRegistrationDetails: (state, action) => {
      state.smcRegistrationDetail = action.payload;
    },
  },
});

export const { getSmcRegistrationDetails } = CommonActivity.actions;

export default CommonActivity.reducer;
