import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  captchaEnabledFlag: { data: false, isLoading: Boolean(true), isError: false },
  generateCaptcha: {
    transaction_id: '',
    image: '',
  },
  validateCaptchaFlag: {},
  loginData: {
    data: {},
    accessToken: '',
    refreshToken: '',
  },
};

const loginReducer = createSlice({
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
      state.loginData.data = action.payload;
      state.loginData.accessToken = action.payload.responseHeader['access-token'];
      state.loginData.refreshToken = action.payload.responseHeader['refresh-token'];
    },
  },
});

export const { getCaptchaEnabledFlag, generateCaptcha, validateCaptcha, loginUser } =
  loginReducer.actions;

export default loginReducer.reducer;
