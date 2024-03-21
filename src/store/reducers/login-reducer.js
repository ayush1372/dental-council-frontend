import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  captchaEnabledFlag: { data: false, isLoading: Boolean(true), isError: false },
  generateCaptcha: {
    expression: '',
    result: '',
  },
  validateCaptchaFlag: {},
  loginData: {
    data: {},
    accessToken: '',
    refreshToken: '',
  },
  activeState: '',
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
      state.loginData = action.payload;
    },
    refreshTokenApi: (state, action) => {
      state.loginData = action.payload;
    },
    loginActiveState: (state, action) => {
      state.activeState = action.payload;
    },
  },
});

export const {
  getCaptchaEnabledFlag,
  generateCaptcha,
  validateCaptcha,
  loginUser,
  refreshTokenApi,
  loginActiveState,
} = loginReducer.actions;

export default loginReducer.reducer;
