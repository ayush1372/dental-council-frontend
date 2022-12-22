/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appFontSize: '',
  appFontType: '',
};

export const AppFontSizeActivity = createSlice({
  name: 'AppFontSize',
  initialState,
  reducers: {
    small: (state) => {
      state.appFontSize = 20;
      state.appFontType = 'small';
    },
    medium: (state) => {
      state.appFontSize = 24;
      state.appFontType = 'medium';
    },
    large: (state) => {
      state.appFontSize = 28;
      state.appFontType = 'large';
    },
  },
});

export const { small, medium, large } = AppFontSizeActivity.actions;

export default AppFontSizeActivity.reducer;
