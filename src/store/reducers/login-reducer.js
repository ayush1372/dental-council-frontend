import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  captchaEnabledFlag: false,
  generateCaptcha: {
    transaction_id: '',
    image: '',
  },
};

const login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    getCaptchaEnabledFlag: (state, action) => {
      state.captchaEnabledFlag = action.payload;
    },
    generateCaptcha: (state, action) => {
      state.generateCaptcha = action.payload;
    },
  },
});

export const { getCaptchaEnabledFlag, generateCaptcha } = login.actions;

export default login.reducer;
