import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: { status: [], isLoading: Boolean(true), isError: false },
};

const forgotPassword = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    getForgotPassword: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { getForgotPassword } = forgotPassword.actions;

export default forgotPassword.reducer;
