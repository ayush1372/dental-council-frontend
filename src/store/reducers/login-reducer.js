import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  captchaEnabledFlag: { data: false, isLoading: Boolean(true), isError: false },
  generateCaptcha: {
    transaction_id: '',
    image: '',
  },
  validateCaptchaFlag: {},
  login: {},
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
    validateCaptcha: (state, action) => {
      state.validateCaptchaFlag = action.payload;
    },
    loginUser: (state, action) => {
      state.login = action.payload;
    },
  },
});

export const { getCaptchaEnabledFlag, generateCaptcha, validateCaptcha, loginUser } = login.actions;

export default login.reducer;
