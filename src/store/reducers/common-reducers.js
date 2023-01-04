import { createSlice } from '@reduxjs/toolkit';

import { SessionTimer } from '../../constants/session-timer';

const sessionTiming = 0.5;

const initialState = {
  isloggedIn: false,
  timer: 0,
  mobileNumber: undefined,
  loggedInUserType: '',
  userActiveTab: '',
  getUserAadhaarNumber: '',
};

export const CommonActivity = createSlice({
  name: 'common',
  initialState,
  reducers: {
    resetCommonReducer: () => initialState,
    login: (state) => {
      state.isloggedIn = true;
      state.timer = SessionTimer(sessionTiming * 60);
    },
    logout: (state) => {
      state.isloggedIn = false;
      state.timer = 0;
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
    changeUserActiveTab: (state, action) => {
      state.userActiveTab = action.payload;
    },
    userAadharNumber: (state, action) => {
      state.getUserAadhaarNumber = action.payload;
    },
  },
});

export const {
  userAadharNumber,
  login,
  logout,
  fontsizes,
  setMobileNumber,
  userLoggedInType,
  resetCommonReducer,
  setApiLoading,
  changeUserActiveTab,
} = CommonActivity.actions;

export default CommonActivity.reducer;
