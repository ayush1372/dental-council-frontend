/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appFontSize: 20,
};

export const AppFontSizeActivity = createSlice({
  name: 'AppFontSize',
  initialState,
  reducers: {
    small: (state) => {
      state.appFontSize = 20;
    },
    medium: (state) => {
      state.appFontSize = 24;
    },
    large: (state) => {
      state.appFontSize = 28;
    },
  },
});

export const { small, medium, large } = AppFontSizeActivity.actions;

export default AppFontSizeActivity.reducer;
