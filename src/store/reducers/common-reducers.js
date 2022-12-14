import { createSlice } from '@reduxjs/toolkit';

import { SessionTimer } from '../../constants/session-timer';

// import { sessionTimer } from '../../constants/session-timer';

const sessionTiming = 0.5;

const initialState = {
  isloggedIn: false,
  timer: 0,
  mobileNumber: undefined,
  loggedInUserType: '',
};

export const LoginActivity = createSlice({
  name: 'Login',
  initialState,
  reducers: {
    login: (state) => {
      state.isloggedIn = true;
      state.timer = SessionTimer(sessionTiming * 60);
    },
    logout: (state) => {
      state.isloggedIn = false;
      state.timer = 0;
    },
    fontsizes: (state) => {
      state.fontsize = 20;
    },
    setMobileNumber: (state, action) => {
      state.mobileNumber = action.payload;
    },
    userLoggedInType: (state, action) => {
      state.loggedInUserType = action.payload;
    },
    setApiLoading: (state, action) => {
      state.apiLoading = action.payload;
    },
    resetLoginReducer: () => initialState,
  },
});

export const {
  login,
  logout,
  fontsizes,
  setMobileNumber,
  userLoggedInType,
  resetLoginReducer,
  setApiLoading,
} = LoginActivity.actions;

export default LoginActivity.reducer;
