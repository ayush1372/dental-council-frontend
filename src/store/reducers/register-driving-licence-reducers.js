import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  generateMobileOTP: { data: [], isLoading: Boolean(true), isError: false },
};

const registerDrivingLicenceReducer = createSlice({
  name: 'getregister-driving-licence-reducer',
  initialState,
  reducers: {
    getGenerateMobileOTP: (state, action) => {
      state.generateMobileOTP = action.payload;
    },
  },
});

export const { getGenerateMobileOTP } = registerDrivingLicenceReducer.actions;

export default registerDrivingLicenceReducer.reducer;
