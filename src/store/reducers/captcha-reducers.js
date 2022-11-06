import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  certData: { data: [], isLoading: Boolean(true), isError: false },
};

const captchaReducer = createSlice({
  name: 'captcha',
  initialState,
  reducers: {
    Cret: (state, action) => {
      state.certData = action.payload;
    },
  },
});

export const { Cret } = captchaReducer.actions;

export default captchaReducer.reducer;
