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
      state.loginData = action.payload;
      JSON.stringify(
        localStorage.setItem('accesstoken', action.payload.responseHeader['access-token'])
      );
      JSON.stringify(
        localStorage.setItem('refreshtoken', action.payload.responseHeader['refresh-token'])
      );
    },
  },
});

export const { getCaptchaEnabledFlag, generateCaptcha, validateCaptcha, loginUser } =
  loginReducer.actions;

export default loginReducer.reducer;
